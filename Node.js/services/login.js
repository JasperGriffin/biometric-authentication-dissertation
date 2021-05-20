//https://www.npmjs.com/package/compute-cosine-similarity - Cosine similarity library 

var similarity = require( 'compute-cosine-similarity' );

const validateLogin = (req) => {
    textLength = parseInt(Object.keys(req.body.keystrokes).length);
    //console.log('length: ' + Object.keys(req.body.key).length);

    kdl = Object.keys(req.body.key[0].keydownLatency).length;
    kul = Object.keys(req.body.key[0].keyupLatency).length;
    rd = Object.keys(req.body.key[0].releaseDuration).length;
    hd = Object.keys(req.body.key[0].holdingDuration).length;
    
    if (kdl != textLength-1 || kul != textLength-1 || rd != textLength-1 || hd != textLength) {
        console.log(kdl);
        console.log(kul);
        console.log(rd);
        console.log(hd);    
        return true;
    }
}

const cosineSimilarity = (req, user) => {
     
    let username = String,
        mousemove = Number,
        csKeydownLatency = Number,
        csKeyupLatency = Number,
        csHoldingDuration = Number,
        csReleaseDuration = Number;

    username = req.body.username; 
    mousemove = req.body.mousemove;

    csKeydownLatency = similarity(req.body.key[0].keydownLatency, user.avgKeydownLatency);
    csKeyupLatency = similarity(req.body.key[0].keyupLatency, user.avgKeyupLatency); 
    csHoldingDuration = similarity(req.body.key[0].holdingDuration, user.avgHoldingDuration);
    csReleaseDuration = similarity(req.body.key[0].releaseDuration, user.avgReleaseDuration); 

    return {
        username,
        mousemove,
        csKeydownLatency,
        csKeyupLatency,
        csHoldingDuration,
        csReleaseDuration
    };

};

module.exports.validateLogin = validateLogin;
module.exports.cosineSimilarity = cosineSimilarity; 
