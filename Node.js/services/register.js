

const validateUser = (req,res) => {

    textLength = Object.keys(req.body.keystrokes).length; 
    textLength = Number("textLength");
    
    for (var i = 0; i < Object.keys(req.body.key).length; i++) {

        kdl = Object.keys(req.body.key[i].keydownLatency).length;
        kul = Object.keys(req.body.key[i].keyupLatency).length;
        rd = Object.keys(req.body.key[i].releaseDuration).length;
        hd = Object.keys(req.body.key[i].holdingDuration).length;
        
        if (kdl != textLength-1 || kul != textLength-1 || rd != textLength-1 || hd != textLength) {
            return true; 
        }
        else {
            console.log('sentences are wrong'); 
            res.status(400).send({ status: "SentencesAreWrong", message: "SentencesAreWrong"})

        }
    }
}


module.exports.validateUser = validateUser; 
