const router = require('express').Router(); 
const User = require('../models/user'); 

router.post('/register', async (req, res) => {

    //JWT tokens

    console.log('username: ' + req.body.username); 
    console.log('keystrokes: ' + req.body.keystrokes);
    console.log('mousemove: ' + req.body.mousemove); 
    console.log('keydownlatency: ' + req.body.key[0].keydownLatency); 

    const user = new User({
        username: req.body.username
    })
    try {
        const registeredUser = await user.save(); 
    } catch(err) {
        console.log('oops'); 
    }
}); 


module.exports = router;