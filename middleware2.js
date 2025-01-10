// const express = require("express");

// const app = express();
// let requestCount = 0;

// function realSumHandeler(req,res){
//     console.log("control reached the handler");
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);
//     console.log(req.name);
// }
// app.use(requestIncreaser);
// app.get("/sum",realSumHandeler);
// app.get("/multiply",realSumHandeler);
// app.get("/divide",realSumHandeler);
// app.listen(3000);

// const express = require("express");
// const app = express();

// app.use(express.json());

// app.post("/sum",function(req,res) {
//     const a = parseInt(req.body.a);
//     const b = parseInt(req.body.b);
//     res.json({
//         ans: a+b
//     })
// });
// app.listen(3000);


const jwt = require("jsonwebtoken");
const zod = require("zod");

const JWT_SECRET = "birat"; 


const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);


function signJWT(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if (!usernameResponse.success || !passwordResponse.success) {
        return null; 
    }

    const signature = jwt.sign({ username }, JWT_SECRET);
    return signature;
}


const token = signJWT("birat@example.com", "securepassword");
console.log("Generated Token:", token);


function verifyJWT(token) {
    try {
        jwt.verify(token, JWT_SECRET);
        return true; 
    } catch (e) {
        return false; 
    }
}


console.log("Is Token Valid?", verifyJWT(token));


function decodeJWT(token) {
    const decoded = jwt.decode(token);
    return decoded ? decoded : null; 
}


console.log("Decoded Token:", decodeJWT(token));
