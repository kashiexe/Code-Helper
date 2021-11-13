module.exports = {
  name: "l",
  execute(message, args, Discord, db, clib) {
    let alltags = db.get(`tags`)
    let newarray = [];
    for(let i = 0; i < alltags.length; i++) {
      let views = db.get(`${alltags[i]}_views`)
      let verified = db.get(`${alltags[i]}_verified`)

      if(!views || views == null) continue;

      newarray.push({
        name: alltags[i],
        views: views,
        verified: verified
      })
    }
    let a = 0
    let limit = 10
    let recommended = [];
    newarray.sort((a, b) => b.views - a.views)
    for(let j = 0; j < newarray.length; j++) {
      a++
      if(a >= limit) continue;
      let verified = ' '
      let views = newarray[j].views
      if(!views) {
        views = '**New**'
      } else {
        views = `**${newarray[j].views}** Views`
      }
      if(newarray[j].verified == true) {
       verified = clib.emoji.verified
      }
      recommended.push(`\`${newarray[j].name}\` ${verified} - ${views}`)
    }
    let recommendations = new Discord.MessageEmbed()
    .setTitle(`Top 10 tags`)
    .setColor(clib.color.lgreen)
    .setDescription(recommended.join('\n'))
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(recommendations)
  }
}