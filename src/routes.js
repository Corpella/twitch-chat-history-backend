const express = require("express")

const router = express.Router()

const Message = require("./models/message")


// Get chat history

router.get("/:interval", async (req, res) => {
    try {
        const chatHistory = await Message.find()

        // const hours = typeof req.params.interval == 'number' ? req.params.interval : 12

        // const chatHistory = await Message.find({
        //     "createdAt": {
        //         $lt: new Date(),
        //         $gte: new Date(Date.now() - hours * 60 * 60 * 1000)
        //     }
        // })

        res.json(chatHistory)
        
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

module.exports = router