const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    color: {
        type: String,
        default: "#0000F"
    },
    message: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Message", messageSchema)