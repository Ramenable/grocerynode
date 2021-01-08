const mongoose = require("mongoose");

const user = mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true,
    },
    roomCode: {
        type: String,
        index: true,
        required: true,
    },
});

//user.index({ roomCode: 1, username: 1 }, { unique: true });
module.exports = mongoose.model("User", user);