const Discord = require('discord.js');
const {
  blue,
  emojiAttention
} = require('../../../config.json');
const db = require('quick.db');
const emojis = require('../../../emojis.json')
module.exports = {

  name: 'avatar',
  description: "donne l'avatar de la personne mentionné",
  aliases: ['avatar', 'pic'],
  usage: 'pic + <@user>',
  perms: `\`SEND_MESSAGES\``,

  async execute(message, args, client, lang) {

    let color;
    if (db.get(`${message.guild.id}.Color`)) {
        color = db.get(`${message.guild.id}.Color`)
    } else {
        color = blue;
    }
    
    let member = message.mentions.users.first() || message.author;
    let avatar = member.displayAvatarURL({ size: 1024, dynamic: true });

    const embed = new Discord.MessageEmbed()
      .setTitle(`${member.username}`)
      .setDescription(`[Avatar](`+ member.displayAvatarURL({dynamic: true, size: 512}) +`)`)
      .setImage(avatar)
      .setColor(color)
      .setTimestamp()
      .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`)

    message.channel.send(embed);
  },
};