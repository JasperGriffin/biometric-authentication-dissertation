const router = require('express').Router(); 

router.post('/register', (req, res) => {

    //JWT tokens

    console.log('username: ' + req.body.username); 
    console.log('keystrokes: ' + req.body.keystrokes);
    console.log('keydownLatency:  ' + req.body.keydownLatency);
    console.log('holdingDuration: ' + req.body.holdingDuration);   
}); 

module.exports = router;