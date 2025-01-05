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

const express = require("express");
const app = express();

app.use(express.json());

app.post("/sum",function(req,res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        ans: a+b
    })
});
app.listen(3000);