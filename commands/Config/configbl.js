const { MessageEmbed } = require('discord.js');
const db = require(`quick.db`)

module.exports = {
    name: 'blacklist',

    async execute(message, args, client, lang) {

        
    let serveurid = message.guild.id

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

    if(args == 0) return message.lineReply(`${emojis.alert} ${lang.BlArgs00}`)

        if (args[0] === 'on') {
          db.set(`config_blacklist_${serveurid}`, 'on')
          return message.lineReply(`${emojis.on} ${lang.BlOn}`)
        } else if (args[0] === 'off') {
        db.set(`config_blacklist_${serveurid}`, 'off')
        return message.lineReply(`${emojis.off} ${lang.BlOff}`)
        } 

        }
    }
