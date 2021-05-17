const mongoose = require('mongoose');


var keySize = 14; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 9,
        max: 9,
        match: [/User#[0-9]+/]
    }
    /*,
    keystrokes: {
        type: String,
        required: true,
        min: keySize, 
        max: keySize
    },
    meanKeydownLatency: {
        type: [Number],
        required: true,

    }
    */
    //mean keydownlatency arr

    //mean keyuplatency arr

    //mean holdingduration arr

    //mean releaeduration arr
})

module.exports = mongoose.model('User', userSchema);