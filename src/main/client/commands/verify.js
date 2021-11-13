module.exports = {
  name: "verify",
  execute(message, args, Discord, db, clib) {
    let developer = db.get(`${message.author.id}_developer`)
    if(developer == true) {
      // if it is a tag
      if(!message.mentions.users.first()) {
        if(!args[0]) {
          message.channel.send(clib.errEmbed('You need to specify a tag to verify!'))
        } else {
          if(!db.get(args[0])) {
            message.channel.send(clib.errEmbed('Please specify a valid tag to verify'))
          } else {
            if(db.get(`${args[0]}_verified`) == true) {
              message.channel.send(clib.errEmbed('This tag is already verified!'))
            } else {
              db.set(`${args[0]}_verified`, true)
              let embed = new Discord.MessageEmbed()
              .setColor(clib.color.lgreen)
              .setDescription(`${clib.emoji.verified} the tag \`${args[0]}\` got verified with success!`)
              message.channel.send(clib.loadingEmbed('Verifying...')).then(message => {
                setTimeout(function() {
                  message.edit(embed)
                }, Date.now() - message.createdTimestamp)
              })
            }
          }
        }
      } else {
        if(db.get(`${message.mentions.users.first()}_verified`) == true) {
          let embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`${clib.emoji.error} This user is already verified!`)
          message.channel.send(embed)
        } else {
          db.set(`${message.mentions.users.first()}_verified`, true)
          let embed = new Discord.MessageEmbed()
          .setColor(clib.color.lgreen)
          .setDescription(`${clib.emoji.verified} the user \`${message.mentions.users.first().username}\` got verified with success!`)
          message.channel.send(`${clib.emoji.loading} Verifying...`).then(message => {
            setTimeout(function() {
              message.edit(embed)
            }, Date.now() - message.createdTimestamp)
          })
        }
      }
    } else {
      let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`${clib.emoji.error} You do not have permissions to use this command!`)
      message.channel.send(embed)
    }
  }
}