const express = require("express");
const {UserModel,TodoModel} = require("./data");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "birat04";

mongoose.connect("mongodb+srv://rokabirat059:3giFWDbZw9MWBpZ1@cluster04.g3sam.mongodb.net/todo-birat-444");
const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    await UserModel.create({
        email : email,
        password : password,
        name : name
    });
    res.json({
        message: "You are signed up"
    })
    
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email : email,
        password : password,
    });
    if(response){
        const token = jwt.sign({
            id: user._id
        },JWT_SECRET);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message : "Incorrect Credentials "
        })

    }
});
function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;
        next();
    });
}


app.post("/todo", authenticateToken, async function (req, res) {
    const { title, description } = req.body;

    try {
        const newTodo = new TodoModel({
            title,
            description,
            userId: req.user.id
        });
        await newTodo.save();
        res.json({
            message: "Todo created"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating todo",
            error: err
        });
    }
});

app.get("/todos", authenticateToken, async function (req, res) {
    try {
        const todos = await TodoModel.find({ userId: req.user.id });
        res.json({ todos });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching todos",
            error: err
        });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));