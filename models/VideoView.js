const mongoose = require("mongoose");

const VideoViewSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    videoID: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("VideoView", VideoViewSchema);