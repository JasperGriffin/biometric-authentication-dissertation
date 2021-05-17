const router = require('express').Router(); 
const User = require('../models/user'); 

const { validateUser, checkUsername } = require('../services/register'); 

router.post('/register', async (req, res) => {

    //check all sentences are same length (13/14) since users can copy and paste
    validateUser(req);

    //check if username already exists in database
    //checkUsername(req, User);

    const testuser = await User.findOne({username: req.body.username});  

    if (testuser) {
        console.log('same user already exists'); 
        //throw { success: 'UserAlreadyExists', message: 'UserAlreadyExists' };
        //return res.status(400).send({ status: "UserAlreadyExists", message: "UserAlreadyExists"})
    }


    //check mousemove

    //calculate average


    //can calculate EER/FAR/FIR of each biometric (keydownlatency, keyuplatency, holdingduration)

    console.log('username: ' + req.body.username); 
    console.log('keystrokes: ' + req.body.keystrokes);
    console.log('mousemove: ' + req.body.mousemove); 
    console.log('keydownlatency: ' + req.body.key[0].keydownLatency); 

    console.log('length: ' + Object.keys(req.body.keystrokes).length); 

    const user = new User({
        username: req.body.username
    })
    try {
        const registeredUser = await user.save(); 
        res.send(req.body); 
    } catch(err) {
        res.status(400).send(err); 
        res.end(); 
    }
}); 




module.exports = router;