const Discord = require("discord.js")
const clib = require("../client/clib.js")

function errEmbed(description) {
  let errEmbed = new Discord.MessageEmbed()
  .setDescription(`<:error:905505962478161952> ${description}`)
  .setColor("RED")
  return errEmbed
}

function loadingEmbed(description) {
  let loadingEmbed = new Discord.MessageEmbed()
  .setDescription(`<:loading:905505963530924033> ${description}`)
  .setColor('#0AB59E')
  return loadingEmbed
}

module.exports = {
  errEmbed,
  loadingEmbed
}