const express = require('express');
const app = express(); 
const port = 8080;
//const user = require('../components/public/users/keystrokes-templates'); 


app.get('/test', (req, res) => {
    res.send(req.body); 
})

