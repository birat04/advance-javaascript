const express = require("express");

const app = express();
let requestCount = 0;

function realSumHandeler(req,res){
    console.log("control reached the handler");
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(req.name);
}