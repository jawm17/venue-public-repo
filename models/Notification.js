const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true  
    },
    videoID: {
        type: String,
    },
    textContent: {
        type: String,
    },
    amount: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Notification", NotificationSchema);