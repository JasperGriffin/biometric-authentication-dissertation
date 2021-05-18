const router = require('express').Router(); 
const User = require('../models/user'); 

const { validateUser } = require('../services/register'); 

router.post('/register', async (req, res) => {

    //check all sentences are same length (13/14) since users can copy and paste
    validateUser(req);

    //check if username already exists in database
    const checkUsername = await User.findOne({username: req.body.username});  

    if (checkUsername) {
        return res.status(400).json({
            status: 'UserDuplication',
            error: 'UserAlreadyExists',
            user: null
        });
    }
    

    //check mousemove
    if (req.body.mousemove < 100) {
        return res.status(400).json({
            status: 'BotDetection',
            error: 'BotDetected',
            user: null
        });
    }

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
        return res.status(500).json({
            status: 'DatabaseDisconnected',
            error: 'DatabaseCouldNotConnect',
            user: null
        }); 
    }
}); 


module.exports = router;