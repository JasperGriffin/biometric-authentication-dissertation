const express = require('express');
const app = express();
const port = 3000; 

const authRoute = require('./routes/auth');

app.use('/api/user', authRoute); 


app.get('/', function (req, res) {
    res.send('Hello world');
})

app.listen(port);