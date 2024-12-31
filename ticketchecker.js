const express = require('express');
const app = express();

// Middleware to check the ticket
function ticketchecker(req, res, next) {
    const ticket = req.query.ticket;
    if (ticket === 'valid') {
        next();
    } else {
        res.status(404).send('Access Denied'); 
    }
}


app.use(ticketchecker);


app.get('/ticket', function (req, res) {
    res.send('Ticket is valid');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


