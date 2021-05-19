var similarity = require( 'compute-cosine-similarity' );

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

module.exports.cosineSimilarity = cosineSimilarity; 
