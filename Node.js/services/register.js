
const validateUser = (req) => {

    //potentially check if sentnece is 'this is a test'

    textLength = parseInt(Object.keys(req.body.keystrokes).length);
    
    for (var i = 0; i < Object.keys(req.body.key).length; i++) {

        kdl = Object.keys(req.body.key[i].keydownLatency).length;
        kul = Object.keys(req.body.key[i].keyupLatency).length;
        rd = Object.keys(req.body.key[i].releaseDuration).length;
        hd = Object.keys(req.body.key[i].holdingDuration).length;
        
        if (kdl != textLength-1 || kul != textLength-1 || rd != textLength-1 || hd != textLength) {
            console.log(kdl);
            console.log(kul);
            console.log(rd);
            console.log(hd);    
            return true;
        }
    }
}

const calculateAvg = (req) => {

    let avgKdlArr = [],
        avgKulArr = [],
        avgHdArr = [],
        avgRdArr = [];

    var arrSize = parseInt(Object.keys(req.body.keystrokes).length - 1);
    var keySize = parseInt(Object.keys(req.body.key).length); 

    for (var i = 0; i < arrSize; i++) {

        kdlTotal = 0;
        kulTotal = 0;
        hdTotal = 0;
        rdTotal = 0;

        for (var j = 0; j < keySize; j++) {

            kdlTotal += req.body.key[j].keydownLatency[i];
            kulTotal += req.body.key[j].keyupLatency[i];
            hdTotal += req.body.key[j].holdingDuration[i];
            rdTotal += req.body.key[j].releaseDuration[i];
        }

        // divide by 3 and push values in the 4 arrays
        avgKdl = (kdlTotal / keySize); 
        avgKul = (kulTotal / keySize); 
        avgHd = (hdTotal / keySize); 
        avgRd = (rdTotal / keySize); 

        avgKdlArr.push(avgKdl);
        avgKulArr.push(avgKul);
        avgHdArr.push(avgHd);
        avgRdArr.push(avgRd);

    }

    //extra calculation as holding duration is one size bigger than every other array
    lastTotal = 0;
    for (var i = 0; i < keySize; i++) {
        lastTotal += req.body.key[i].holdingDuration[arrSize];
    }
    avgHd = (lastTotal / keySize)
    avgHdArr.push(avgHd); 

    console.log('finished!');

    return {
        avgKdlArr,
        avgKulArr,
        avgHdArr,
        avgRdArr
    };
    
}

module.exports.validateUser = validateUser; 
module.exports.calculateAvg = calculateAvg;