module.exports = {
  name: 'ping',
  execute(message, Discord, clib, client) {
    let ping = Date.now() - message.createdTimestamp
    let api_ping = client.ws.ping
    message.channel.send(clib.loadingEmbed('Getting the ping...')).then(message => {
      let emoji = clib.emoji.verified
      let emoji_api = clib.emoji.verified
      let color = clib.color.lgreen
      let ec = 0
      if(ping < 200) {
        emoji = emoji
      }
      else if(ping > 200) {
        emoji = clib.emoji.error
        ec = ec + 1
      }
      if(api_ping < 200) {
        emoji_api = emoji_api
      }
      else if(api_ping > 200) {
        emoji_api = clib.emoji.error
        ec =  ec + 1
      }
      switch(ec) {
        case 0:
          color = color
          break;
        case 1:
          color = clib.color.yellow;
          break;
        case 2:
          color = clib.color.orange;
          break;
        default:
          color = clib.color.red;
          break;
      }
      let embed = new Discord.MessageEmbed()
      .setTitle(`Ping Info...`)
      .setColor(color)
      .setDescription(`
      ${emoji_api} **API Latency** - ${api_ping}
      ${emoji} **Bot Latency** - ${ping}
      `)
      .setThumbnail(message.guild.iconURL())
      message.edit(embed)
    })
  }
}