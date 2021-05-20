const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
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
    keydownLatency: {
        type:[Number],
        required: true
    },
    keyupLatency: {
        type:[Number],
        required: true
    },
    holdingDuration: {
        type:[Number],
        required: true
    },
    releaseDuration: {
        type:[Number],
        required: true
    },
    csKeydownLatency: {
        type: Number,
        required: true
    },
    csKeyupLatency: {
        type: Number,
        required: true
    },
    csHoldingDuration: {
        type: Number,
        required: true
    },
    csReleaseDuration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Login', loginSchema);
