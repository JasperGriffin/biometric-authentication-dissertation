const mongoose = require('mongoose');


var keySize = 14; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 9,
        max: 9,
        match: [/User#[0-9]+/]
    },
    mousemove: {
        type: Number,
        required: true
    },
    keystrokes: {
        type:[String],
        required: true
    },
    avgKeydownLatency: {
        type:[Number],
        required: true
    },
    avgKeyupLatency: {
        type:[Number],
        required: true
    },
    avgHoldingDuration: {
        type:[Number],
        required: true
    },
    avgReleaseDuration: {
        type:[Number],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

    //mean keyuplatency arr

    //mean holdingduration arr

    //mean releaeduration arr
})

module.exports = mongoose.model('User', userSchema);