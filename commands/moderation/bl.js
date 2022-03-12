const discord = require("discord.js");
const db = require(`quick.db`)
const emojis = require('../../../emojis.json')

module.exports = {
  name: "bl",
  category: "modération",
  description: "Banni l'utilisateur souhaiter",
  usage: "ban <@utilisateur> <raison>",
  async execute(message, args, client, lang) {

    let owner =  db.fetch(`${message.guild.id}.Owners`)

    if(owner === 0 || owner === null || message.author.id !== owner === 1) return  message.lineReply(`${emojis.no} ${lang.BlError}`)
    if(args == 0) return message.lineReply(`${emojis.alert} ${lang.BlArgs0}`)

    if(args[0] == "add") {

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send(`${emojis.alert} ${lang.BlUser}`)
    const bl = db.fetch(`bl_${user.id}`)
    if(bl == true) return message.channel.send(`<@${user.id}>, ${lang.BlAlready}`)
    message.channel.send(`<@${user.id}>, ${lang.BlNow}`)
    db.set(`bl_${user.id}`, true)
    }
    if(args[0] == "remove") {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send(`${emojis.alert} ${lang.BlUser}`)
    const bl = db.fetch(`bl_${user.id}`)
    if(bl == false) return message.lineReply(`<@${user.id}>, ${lang.BlNo}`)
    message.lineReply(`${emojis.yes} <@${user.id}>, ${lang.BlNoww}`)
    db.set(`bl_${user.id}`, false)
    }
    
    
}
}