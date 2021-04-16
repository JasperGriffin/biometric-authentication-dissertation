const express = require('express');
const app = express();
const port = 4600;

app.get('/', (req, res) => {
    res.send('Hello World!')
});  

app.listen(port, (req, res) => {
    console.log('App listening at http://localhost:${port}')
});
