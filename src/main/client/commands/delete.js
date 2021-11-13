module.exports = {
  name: 'delete',
  execute(message, args, Discord, db, clib) {
    if(!args[0] && !message.mentions.users.first()) {
      message.channel.send(clib.errEmbed('The tag (or user) to delete from the database was not specified!'))
    } else {
      let dev = db.get(`${message.author.id}_developer`)
      if(!dev) {
        message.channel.send(clib.errEmbed('You do not have enough permissions to perform this command!'))
      } else {
        let thing = message.mentions.users.first()
        if(!thing) {
          thing = args[0]
          db.delete(thing)
          db.delete(`${thing}_verified`)
          db.delete(`${thing}_views`)
          db.delete(`${thing}_up`)
          db.delete(`${thing}_down`)
          message.channel.send(clib.loadingEmbed(`Deleting tag \`${thing}\` from the database...`)).then(message => { 
            setTimeout(function() {
              message.edit(`${clib.emoji.check} Successfully deleted tag \`${thing}\` from database!`)
            }, Date.now() - message.createdTimestamp)
          })
        } else {
          db.delete(`${thing}_verified`)
          message.channel.send(clib.loadingEmbed(` Deleting user \`${thing.tag}\` from the database...`)).then(message => { 
            setTimeout(function() {
              message.edit(`${clib.emoji.check} Successfully deleted user \`${thing.tag}\` from database!`)
            }, Date.now() - message.createdTimestamp)
          })
        }
      }
    }
  }
}