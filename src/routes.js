const express = require("express")

const router = express.Router()

const Message = require("./models/message")


// Get chat history

router.get("/:interval", async (req, res) => {
    try {
        // const chatHistory = await Message.find()

        const days = typeof req.params.interval == 'number' ? req.params.interval : 1

        const chatHistory = await Message.find({
            "createdAt": {
                $gt: new Date(new Date().setDate(new Date().getDate() - days)),
                $lt: new Date(),
            }
        })
        console.log(chatHistory.length);

        res.json(chatHistory)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

module.exports = router