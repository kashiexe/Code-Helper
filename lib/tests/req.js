const clib = require("../lib.js")

clib.get('discord.jsv12').then(tag => {
  console.log(tag.content)
})