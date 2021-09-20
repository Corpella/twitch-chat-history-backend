require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const app = express()

const routes = require("./routes")


const uri = process.env.MONGO_URI


mongoose.connect(uri, { useNewUrlParser: true })

const db = mongoose.connection

db.on("error", e => console.error(e))

db.once("open", () => console.log("Connected"))

const Message = require("./models/message")



app.use(express.json())

app.use("/chat", routes)

app.get("/", (req, res) => {
  res.send(("App running"));
})


app.listen(3000, () => {
  console.log(`Started`)
})

// socket client

const tmi = require('tmi.js');

const channel = process.env.CHANNEL_ID

const client = new tmi.Client({
  connection: { reconnect: true },
  // Can potentially work on multiple channels
  channels: [channel]
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
  const msg = new Message({
    name: tags['display-name'],
    color: tags.color,
    message: message
  })
  try {
    await msg.save()

  } catch (error) {
    console.error(error)

  }
  console.log(`${tags['display-name']}: ${message}`);
});
