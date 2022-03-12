
const {
    logs,
    emojiAttention,
    blue,
    prefix
  } = require('../../../config.json');
  
module.exports = {
    name: 'adminlist',
    description: "voir tt les admin",
    usage: 'adminlist',
    perms: `\`admin\``,
  
    async execute(message, args, client, lang) {

    const db = require("quick.db");
    const config = require('../../../config.json')
    const emojis = require('../../../emojis.json')
    const Discord = require("discord.js");

    let color;
    if (db.get(`${message.guild.id}.Color`)) {
        color = db.get(`${message.guild.id}.Color`)
    } else {
        color = blue;
    }

    const NoPerms = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.NoPerms}`)
    .setTimestamp()
    .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(NoPerms);



    var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
    var str_map = str_filtrer.map(m => `\`${m.user.id}\` : <@${m.user.id}>`).join("\n")
    for(let i = 0; i < str_map.length; i += 1995) {
        const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic : true }))
            .setTitle(`${emojis.admin} ${lang.AdminList} ${message.guild.name} (**${str_filtrer.size}**)`)
            .setDescription(`\n${str_content}`)
            .setColor(color)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`)
        )
    }
    }
}