const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    address: {
        type: String
    },
    privateKey: {
        type: String
    },
    custodied: {
        type: Boolean
    },
    username: {
        type: String,
        max: 15
    },
    email: {
        type: String
    },
    profileImg: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/ethresources-1ed10.appspot.com/o/Screen%20Shot%202023-05-26%20at%201.43.56%20AM.png?alt=media&token=3bf94c27-d9e4-420e-860e-c35cdd8cac9d"
    },
    heroImg: {
        type: String,
        default: "https://wallpaperaccess.com/full/3643882.jpg"
    },
    balance: {
        type: Number,
        default: 0
    },
    solEarned: {
        type: Number,
        default: 0
    },
    showSolEarned: {
        type: Boolean,
        default: true
    },
    bio: {
        type: String,
        default: "",
        max: 130
    },
    websiteUrl: {
        type: String,
        default: ""
    },
    numTx: {
        type: Number,
        default: 0
    },
    messageReadCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    txs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    unlocked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    viewHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoView' }],
});

module.exports = mongoose.model('User', UserSchema);