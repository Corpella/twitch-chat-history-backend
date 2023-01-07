const express = require("express")
const Message = require("./models/message")

const router = express.Router()

// TODO: remove once app is updated
router.get("/:interval", async (req, res) => {
    const days = typeof parseInt(req.params.interval) == 'number' ? req.params.interval : 1

    const interval = new Date().getDate() - days

    const fromDate = new Date().setDate(interval)

    try {
        const chatHistory = await Message.find({
            "createdAt": {
                $gt: fromDate,
                $lt: new Date(),
            },
        })

        res.json(chatHistory)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:channel/:interval", async (req, res) => {
    const days = typeof parseInt(req.params.interval) == 'number' ? req.params.interval : 1

    const channel = req.params.channel
    try {
        const interval = new Date().getDate() - days
        const fromDate = new Date().setDate(interval)
        const chatHistory = await Message.find({
            "createdAt": {
                $gt: fromDate,
                $lt: new Date(),
            },
            channel
        })

        res.json(chatHistory)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router