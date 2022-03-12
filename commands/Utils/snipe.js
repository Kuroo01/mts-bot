
const fs = require("fs")
const {
    MessageEmbed
} = require('discord.js');
const {
    emojiAttention,
    blue,
    owner
} = require('../../../config.json');
const db = require("quick.db")
const emojis = require('../../../emojis.json')
const Discord = require('discord.js')


module.exports = {
    name: 'snipe',
    description: "Permet de voir le dernier message supprimer",
    usage: 'snipe',
    perms: `\`aucune\``,
  
    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }

  const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.lineReply(`${emojis.alert} ${lang.SnipeNone}`)
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.username , msg.author.displayAvatarURL({dynamic : true }))
    .setDescription(msg.content)
    .setColor(color)
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setTimestamp()  
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
}
};