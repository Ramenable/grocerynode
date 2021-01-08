const mongoose = require("mongoose");

const room = mongoose.Schema({
    roomCode: {
        type: String,
        unique: true,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    numMembers: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Room", room);