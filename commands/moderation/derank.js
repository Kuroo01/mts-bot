
module.exports = {
  name: "derank",
  category: "modération",
  usage: "clear <nombre de messages>",
  description: "Supprime le nombre de messages voulu",
  async execute(message, args, client, lang) {

    const Discord = require("discord.js")
    const db = require("quick.db");
    const emojis = require('../../../emojis.json')

    let user = await client.users.cache.get(args[0]) || message.mentions.members.first()  
    if(!user) return message.channel.send(`${emojis.alert} ${lang.DerankUser}`)
if(user) {
if (user.id === message.author.id) {
  return message.lineReply(`${emojis.no} ${lang.DerankAuthor}`);
}
if (user.id ===client.user.id) {
  return message.channel.send(`${emojis.no} ${lang.DerankBot}`);
}
if(user.roles.highest.position > message.member.roles.highest.position) return message.lineReply(`${emojis.no} ${lang.DerankPerms}`)
if ( user.roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send(`${emojis.alert} ${lang.DerankUserBotUp}`)

}
if(args[0]) {


 message.lineReply(`${emojis.yes} ${lang.Derank} **${user.user.username}**`)
    user.roles.set([])
    
}
    
}
}