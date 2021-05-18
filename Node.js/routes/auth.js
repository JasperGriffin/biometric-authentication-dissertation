const router = require('express').Router(); 
const User = require('../models/user'); 

const { validateUser, calculateAvg } = require('../services/register'); 

router.post('/register', async (req, res) => {

    //check all sentences are same length (13/14) since users can copy and paste
    const err = validateUser(req);
    if (err) {
        return res.status(400).json({
            status: 'SentenceError',
            error: 'SentencesMatchError',
            user: null
        });
    }

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
    const avgArrays = calculateAvg(req); 

    //can calculate EER/FAR/FIR of each biometric (keydownlatency, keyuplatency, holdingduration)

    const user = new User({
        username: req.body.username,
        mousemove: req.body.mousemove,
        keystrokes: req.body.keystrokes,
        avgKeydownLatency: avgArrays.avgKdlArr,
        avgKeyupLatency: avgArrays.avgKulArr,
        avgHoldingDuration: avgArrays.avgHdArr,
        avgReleaseDuration: avgArrays.avgRdArr
    })
    try {
        const registeredUser = await user.save(); 
        res.send(registeredUser); 
    } catch(err) {
        return res.status(500).json({
            status: 'DatabaseDisconnected',
            error: 'DatabaseCouldNotConnect',
            user: null
        }); 
    }
}); 


module.exports = router;