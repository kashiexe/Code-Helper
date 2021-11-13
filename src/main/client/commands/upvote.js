module.exports = {
  name: "upvote",
  execute(message, args, Discord, db, clib) {
    let tag = args[0]
    if(!tag) {
      message.channel.send(clib.errEmbed('This tag doesn\'t exist or you didn\'t define the tag you wanted to upvote'))
    } else {
      let alreadyupvoted = db.get(`${message.author.id}_upvote_${args[0]}`)
      let downvoted = db.get(`${message.author.id}_downvoted_${args[0]}`)
      if(!alreadyupvoted) {
        message.channel.send(`${clib.emoji.upvote} You upvoted the tag ${args[0]}!`)
        db.delete(`${message.author.id}_downvoted_${args[0]}`)
        if(!downvoted) {
          db.add(`${args[0]}_up`, 1)
        } else {
          db.subtract(`${args[0]}_down`, 1)
          db.add(`${args[0]}_up`, 1)
        }
        db.set(`${message.author.id}_upvote_${args[0]}`, true)
      } else {
        message.channel.send(clib.errEmbed('You have already upvoted this tag!'))
      }
    }
  }
}