const router = require('express').Router(); 
const User = require('../models/user'); 
const Login = require('../models/login'); 

const { validateUser, calculateAvg } = require('../services/register'); 
const { validateLogin, cosineSimilarity } = require('../services/login'); 

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

router.post('/login', async (req, res) => {

    console.log('username from auth.js'); 
    console.log('requests: ' + req.body.username);

    const err = validateLogin(req);
    if (err) {
        return res.status(400).json({
            status: 'SentenceError',
            error: 'SentencesMatchError',
            user: null
        });
    }

    //check mousemove
    if (req.body.mousemove < 0) {
        return res.status(400).json({
            status: 'BotDetection',
            error: 'BotDetected',
            user: null
        });
    }

    const checkUsername = await User.findOne({username: req.body.username});

    if (checkUsername) {
        const result = cosineSimilarity(req, checkUsername); 
        console.log(result.csKeydownLatency);
        console.log(result.csKeyupLatency);
        console.log(result.csHoldingDuration);
        console.log(result.csReleaseDuration); 

        console.log('type: ' + typeof(result.csKeydownLatency)); 

        const login = new Login({
            username: req.body.username,
            mousemove: req.body.mousemove,
            keydownLatency: req.body.key[0].keydownLatency,
            keyupLatency: req.body.key[0].keyupLatency,
            holdingDuration: req.body.key[0].holdingDuration,
            releaseDuration: req.body.key[0].releaseDuration,
            csKeydownLatency: result.csKeydownLatency,
            csKeyupLatency: result.csKeyupLatency,
            csHoldingDuration: result.csHoldingDuration,
            csReleaseDuration: result.csReleaseDuration
        })
        try {
            const loggedUser = await login.save(); 
            res.send(loggedUser); 
        } catch(err) {
            return res.status(500).json({
                status: 'DatabaseDisconnected',
                error: 'DatabaseCouldNotConnect',
                user: null
            }); 
        }

    }
    else {
        console.log("user does not exist"); 
        return res.status(400).json({
            status: 'UserDoesNotExist',
            error: 'UnknownUser',
            user: null
        }); 
    }
})

module.exports = router;