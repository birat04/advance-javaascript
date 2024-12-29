const express = require('express');
function calculatorSum(n){
  let ans = 0;
  for(let i = 1; i <= n; i++){
    ans += i;
  }
  return ans;
}
let ans = calculatorSum(100);
console.log(ans);

const app = express();
app.get('/',function(req,res){
  const n = req.query.n;
  const ans = calculatorSum(n);
  res.send(ans.toString());
})
app.listen(3000, function(){
  console.log('Server is running');
})
  