require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const app = express()

var cors = require('cors')

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

// socket client

const tmi = require('tmi.js');

const channel = process.env.CHANNEL_ID

const client = new tmi.Client({
  options: {
    debug: true
  },
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
});

// Prevent HEROKU from putting your app to sleep after 30 mins of inactivity by making a request every 29mins.

//If you're not using Heroku, you can ignore this abomination
const herokuURL = process.env.HEROKU_REFRESH_ENDPOINT

if (herokuURL) {
  var https = require("https");
  setInterval(function () {
    console.log('Refresh server')
    https.get(herokuURL + "/chat/1");
  }, 1740000);

}
