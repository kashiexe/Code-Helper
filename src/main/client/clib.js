// in case you fork this and want to change it, make sure you change this info too :)
let functions_embed = require("../discord/embedEx.js")

module.exports = {
  prefix: '$',
  errEmbed: functions_embed.errEmbed,
  loadingEmbed: functions_embed.loadingEmbed,
  color: {
    lgreen: '#5AFFB7',
    blue: '#012D4E',
    dgreen: '#0AB59E',
    red: '#ed374c',
    orange: '#ed8637',
    yellow: '#ebd636',
    random: [
      '#37ed67',
      '#5AFFB7',
      '#012D4E',
      '#0AB59E',
      '#ed374c',
      '#37a1ed',
      '#ebd636',
      '#ed8637'
    ]
  },
  emoji: {
    upvote: '<:upvote:907317858294444032>',
    downvote: '<:downvote:907317857107472474>',
    loading: '<:loading:905505963530924033>',
    check: '<:check:905505962373304320>',
    error: '<:error:905505962478161952>',
    views: '<:view:907318248670887976>',
    verified: '<:verified:907361664733687818>'
  }
}