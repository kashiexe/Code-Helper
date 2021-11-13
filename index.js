// Packages and important stuff
const express = require("express")
const bodyParser = require('body-parser');
const app = express()
const Discord = require("discord.js")
require("discord-reply")
const client = new Discord.Client()
const fs = require("fs")
const chalk = require("chalk")
const db = require("quick.db")
const clib = require("./src/main/client/clib.js")
const pckjson = require("./package.json")

// Web
app.engine('html', require("ejs").renderFile)
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/src/app/views/home.html')
})

app.get("/styles/:f", function(req, res) {
  res.sendFile(__dirname + '/src/app/styles/' + req.params.f)
})

app.get("/assets/:f", function(req, res) {
  res.sendFile(__dirname + '/util/assets/' + req.params.f)
})

app.get("/api/tag/:tag", function(req, res) {
  res.status(200).send(db.get(req.params.tag))
})

app.get("/api/alltags", function(req, res) {
  res.status(200).send(db.get(`tags`))
})

app.post("/api/newTag", function(req, res) {
  let body = req.body
  let tag = body.name
  let tagExist = db.get(body.name)
  if(!tagExist) {
    tag = tag
  } else {
    tag = `-${body.name}`
  }
  db.set(tag, {
    name: tag,
    content: body.content,
    author: body.author
  })
  let tags = db.get(`tags`)
  db.push(`tags`, tag)
})

app.listen(3000, function() {
  console.log(chalk.yellow('Running on version ') + chalk.green(pckjson.version))
})

// Client command handler
client.commands = new Discord.Collection()

const folderfiles = fs.readdirSync('./src/main/client/commands').filter(file => file.endsWith(".js"))
for(const file of folderfiles) {
  command = require("./src/main/client/commands/" + file)

  client.commands.set(command.name, command)
}

client.on('message', message => {
  let prefix = clib.prefix;
	const args = message.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

  if(!message.content.includes(prefix) || message.author.bot) {
    return
  }

  //commands
  if(command === "p" || command === "publish" || command === "c" || command === "create") {
    client.commands.get("create").execute(message, Discord, args, db, clib)
  }
  if(command === "tag" || command === "t") {
    client.commands.get("tag").execute(message, args, client, Discord, db, clib)
  }
  if(command === "leaderboard" || command === "l" || command === "lb") {
    client.commands.get("l").execute(message, args, Discord, db, clib)
  }
  if(command === "upvote" || command === "up") {
    client.commands.get("upvote").execute(message, args, Discord, db, clib)
  }
  if(command === "downvote" || command === "down") {
    client.commands.get("downvote").execute(message, args, Discord, db, clib)
  }
  if(command === "verify") {
    client.commands.get("verify").execute(message, args, Discord, db, clib)
  }
  if(command === "delete") {
    client.commands.get("delete").execute(message, args, Discord, db, clib)
  }
  if(command === "ping") {
    client.commands.get("ping").execute(message, Discord, clib, client)
  }
})

client.login(process.env["client_token"])