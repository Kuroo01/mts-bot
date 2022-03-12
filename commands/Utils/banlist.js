module.exports = {
  name: 'banlist',
  description: "voir tt les bans",
  usage: 'banlist',
  perms: `\`aucune\``,

  async execute(message, args, client, lang) {
    const {
      logs,
      emojiAttention,
      blue,
      prefix
    } = require('../../../config.json');
    

  const db = require("quick.db");
  const config = require('../../../config.json')
  const emojis = require('../../../emojis.json')
  const { MessageEmbed } = require("discord.js"); 
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


  if (!message.guild.available) return this.client.logger.info(`Serveur "${message.guild.name}" (${message.guild.id}) est indisponible.`);
 


 
  message.guild.fetchBans()
  .then(bans => {
    const obj = bans.map(c => ({
      user: `\`${c.user.id}\` : <@${c.user.id}>`
    }));
    const bList = Array.from(obj);
    if (bList.length < 1) return message.lineReply(`${emojis.alert} ${lang.BanNone} **${message.guild.name}**.`);
    let index = 0;

    const embed = new MessageEmbed()
        .setTitle(`${emojis.ban} ${lang.BanList} ${message.guild.name} (**${++index}**) `)
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic : true }))
        .setDescription(`${bList.map(bl => `\n${bl.user}`).join("")}`)
        .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`)
        .setTimestamp()  
        .setColor(color)
   
        message.channel.send(embed)
  });
}
}