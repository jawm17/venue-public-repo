const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toAddress: {
        type: String,
        required: true
    },
    fromAddress: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    hash: {
        type: String,
    },
    videoID: {
        type: String
    },
    tokenId: {
        type: Number,
        default: 0
    },
    checks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Transaction", TransactionSchema);