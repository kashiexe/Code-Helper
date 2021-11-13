module.exports = {
  name: "downvote",
  execute(message, args, Discord, db, clib) {
    let tag = args[0]
    if(!tag) {
      message.channel.send(clib.errEmbed('This tag doesn\'t exist or you didn\'t define the tag you wanted to downvote'))
    } else {
      let alreadydownvoted = db.get(`${message.author.id}_downvoted_${args[0]}`)
      let upvoted = db.get(`${message.author.id}_upvote_${args[0]}`)
      if(!alreadydownvoted) {
        message.channel.send(`${clib.emoji.downvote} You downvoted the tag ${args[0]}!`)
        db.set(`${message.author.id}_downvoted_${args[0]}`, true)
        db.delete(`${message.author.id}_upvote_${args[0]}`)
        if(!upvoted) {
          db.add(`${args[0]}_down`, 1)
        } else {
          db.subtract(`${args[0]}_up`, 1)
          db.add(`${args[0]}_down`, 1)
        }
      } else {
        message.channel.send(clib.errEmbed('You have already downvoted this tag!'))
      }
    }
  }
}