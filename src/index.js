require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const app = express()

const cors = require('cors')

const routes = require("./routes")


const uri = process.env.MONGO_URI


mongoose.connect(uri, { useNewUrlParser: true })

const db = mongoose.connection

db.on("error", e => console.error(e))

db.once("open", () => console.log("Connected"))

const Message = require("./models/message")

app.use(cors())

app.use(express.json())

app.use("/chat", routes)

app.get("/", (req, res) => {
  res.send(("App running"));
})


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Started`)
})

const tmi = require('tmi.js');

const channels = process.env.CHANNEL_ID.split(',')


const client = new tmi.Client({
  options: {
    debug: true
  },
  connection: { reconnect: true },
  channels
});

client.connect();


client.on('message', async (channel, tags, message) => {
  const msg = new Message({
    name: tags['display-name'],
    color: tags.color,
    channel,
    message
  })
  try {
    msg.save()
  } catch (error) {
    console.error(error)
  }
});