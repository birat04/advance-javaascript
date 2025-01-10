// const axios = require('axios');
// async function main(){
//     const response = await fetch("https://sum-server.100xdevs.com/todos");
//     const json = await response.json();
//     console.log(json.todos.length)

// }
// main();


// async function main(){
//     const response = await axios.get("https://sum-server.100xdevs.com/todos");
//     const json = await response.json();
//     console.log(json.todos.length)

// }
// main();



const jwt = require("jsonwebtoken");

const value = {
    name: "Birat",
    accountNumber: 123123123
}
const token = jwt.sign(value,"secret");
console.log(token);