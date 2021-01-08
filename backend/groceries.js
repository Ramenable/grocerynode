const mongoose = require("mongoose");

const grocery = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true,
    },
    roomCode: {
        type: String,
        index: true,
        required: true,
    },
    message: {
        type: String,
        index: true,
        required: false,
    },
    requester: {
        type: String,
        index: true,
        required: true,
    },
});

module.exports = mongoose.model("Grocery", grocery);