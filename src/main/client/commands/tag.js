module.exports = {
  name: "tag",
  execute(message, args, client, Discord, db, clib) {
    let tag = args[0]
    if(!tag) {
      message.channel.send(clib.errEmbed('This tag doesn\'t exist or you didn\'t define the tag you wanted to see')) 
    } else {
      let tagobj = db.get(args[0])
      if(!tagobj) {
        message.channel.send(clib.errEmbed('This tag doesn\'t exist or you didn\'t define the tag you wanted to see'))
      } else {
        db.add(`${args[0]}_views`, 1)
        let upvotes = db.get(`${args[0]}_up`)
        let downvotes = db.get(`${args[0]}_down`)
        let verifiedtag = db.get(`${args[0]}_verified`)
        let emoji = ' '
        if(verifiedtag == true) {
          emoji = clib.emoji.verified
        }
        if(!upvotes) {
          upvotes = 0
        }
        if(!downvotes) {
          downvotes = 0
        }
        let randomcolors = clib.color.random
        let random = randomcolors[Math.floor(Math.random() * randomcolors.length)]
        let user = client.users.cache.get(tagobj.author)
        if(!user) {
          user = tagobj.author
        } else {
          user = user.tag
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(`${args[0]} ${emoji}`)
        .addField(`Content`, tagobj.content)
        .setColor(random)
        .setDescription(`**${db.get(`${args[0]}_views`)}** ${clib.emoji.views} **${upvotes}** ${clib.emoji.upvote} **${downvotes}** ${clib.emoji.downvote}`)
        .setFooter(`by ${user}`)
        message.channel.send(embed)
      }
    }
  }
}