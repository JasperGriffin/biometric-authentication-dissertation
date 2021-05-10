const router = require('express').Router(); 

router.post('/register', (req, res) => {

    //JWT tokens

    console.log('username: ' + req.body.username); 
    console.log('keystrokes: ' + req.body.keystrokes);
    console.log('keydownLatency:  ' + req.body.keydownLatency);
    console.log('keyuplatency ' + req.body.keyupLatency); 
    console.log('holdingDuration: ' + req.body.holdingDuration);  
    console.log('releaseDuration: ' + req.body.releaseDuration); 
    console.log('mousemove: ' + req.body.mousemove); 
}); 

module.exports = router;