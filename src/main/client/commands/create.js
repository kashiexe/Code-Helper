module.exports = {
  name: "create",
  execute(message, Discord, args, db, clib) {
    if(!args[0] || !args[1]) {
      message.channel.send(clib.errEmbed('You need to specify the name of the command and the code to send'))
    } else {
      let tagExist = db.get(`${args[0]}`)
      if(!tagExist) {
        tag = `${args[0]}`
      } else {
        tag = `-${tagExist.name}`
      }
      let description = args.slice('[').pop(" ").slice("]")
      db.set(`${tag}`, {
        name: `${tag}`,
        content: args.slice(1).join(' '),
        author: message.author.id
      })
      let tags = db.get(`tags`)
      db.push(`tags`, tag)
      message.channel.send(clib.loadingEmbed('Creating your tag...`')).then(message => { 
        setTimeout(function() {
          message.edit(`${clib.emoji.check} Successfully created tag \`\`${tag}\`\` with the following Content: \n${args.slice(1).join(' ')}`)
        }, Date.now() - message.createdTimestamp)
      })
    }
  }
}