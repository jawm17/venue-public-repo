const mongoose = require("mongoose");

const CardNftSchema = new mongoose.Schema({
    ownerAddress: {
        type: String,
        required: true
    },
    contractAddress: {
        type: String,
        required: true
    },
    txId: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("CardNft", CardNftSchema);