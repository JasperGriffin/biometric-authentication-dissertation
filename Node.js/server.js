const express = require('express');
const app = express();
const port = 3000; 

const authRoute = require('./routes/auth');

//stop XMLHttpRequsts being blocked by CORS policy
const cors = require('cors');

app.use(cors()); 

//body parser
app.use(express.json()); 

//URL encoded 
app.use(express.urlencoded());

app.use('/api/user', authRoute); 

app.get('/', function (req, res) {
    res.send('Hello world');
})

app.listen(port);