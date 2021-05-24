//https://www.youtube.com/watch?v=2jqok-WgelI - server configuration
 
const express = require('express');
const app = express();
const port = 3000; 
const mongoose = require('mongoose'); 
const authRoute = require('./routes/auth');

mongoose.connect('mongodb://localhost/users', {
     useNewUrlParser: true, useUnifiedTopology: true 
});

//stop XMLHttpRequsts being blocked by CORS policy
const cors = require('cors');

app.use(cors()); 

//body parser
app.use(express.json()); 

//URL encoded 
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRoute); 

app.get('/', function (req, res) {
    res.send('Hello world');
})

app.listen(port);