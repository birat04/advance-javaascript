const express  = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomBirat";
const app = express();
app.use(express.json());

const users = [];

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
//         'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
        
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

app.post("/signup",function(req,res) {
    const username = req.body.username;
    const password = req.body.password;
   

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"you have signin successfully"
    })
    console.log(users);

})
app.post("/signin",function(req,res) {
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
app.get("/me", function(req,res){
        const token = req.headers.token;
        const decodedInformation = jwt.verify(token, JWT_SECRET);
        const username = decodedInformation.username;
        let foundUser = null;
        for(let i = 0; i <users.length; i++){
            if(users[i].username === username){
                foundUser = users[i];
            }
        }
        if(foundUser){
            res.json({
                username : foundUser.username,
                password : foundUser.password
            })
        } else{
            res.status(403).send({
                message: "Invalid token"
            })
        }
    })
    

app.listen(3000);