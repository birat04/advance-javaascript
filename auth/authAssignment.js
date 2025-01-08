const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "birat025"

const app = express();
app.use(express.json());

let users = [];

function logger(req,res,next){
    console.log(req.method + "request came");
    next();
}
app.post("/signup",logger,function(req,res) {
    const username = req.body.username;
    const password = req.body.password;
   

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"you have signin successfully"
    })
    

})
app.post("/signin",logger,function(req,res) {
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;

    for(let i = 0; i <users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
        } 
    } 
    if(foundUser){
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        foundUser.token = token;
        res.json({
            message: "Signin successful",
            token: token
        })
    } else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    

})
function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);
    
    if(decodedData.username){
        req.username = decodedData.username;
        next();
    } else{
        res.json({
            message: "Invalid token"
        });
    }
}
app.get("/me",logger,auth, (req, res) => {
    let foundUser = null;
    for(let i = 0; i < users.length; i++) {
        if(users[i].username === req.username) {
            foundUser = users[i];
        }
    }
    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})
    
app.listen(3000);
    

    
    



  


// app.get("/todo", auth, (req, res) => {
// })






// app.post("/todo", auth, (req, res) => {
// })



// app.delete("/todo", auth, (req, res) => {
// })