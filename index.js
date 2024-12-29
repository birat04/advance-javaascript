const express = require("express");

const app = express();
function calculatorSum(n){
    let ans = 0;
    for(let i = 1; i <= n; i++){
        ans += i;
    }
    return ans;
}
let ans = calculatorSum(100);
console.log(ans);
app.get("/", function(req,res){
    res.sendStatus("Hello World");
})

app.listen(3000)

