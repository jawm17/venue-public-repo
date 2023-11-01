const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    videoSrc: {
        type: String,
        required: true
    },
    thumbSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    timestamp: {
        type: String,
        default: "00:00"
    },
    accessType: {
        type: String,
        default: ""
    },
    accessToken: {
        type: Object,
        default: {}
    },
    price: {
        type: Number,
        default: 0
    },
    chain: {
        type: String,
        default: ""
    },
    tokenLink: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
    solEarned: {
        type: Number,
        default: 0
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    txs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    viewHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoView' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model("Video", VideoSchema);