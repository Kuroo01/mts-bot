const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
const ms = require('ms')
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
const {
     blue,
    logs,
    emojiAttention,
    emojiON,
    emojiOFF
} = require('../../../config.json');

module.exports = {
    name: 'reroll',
    description: 'reroll le giveaway tdc',
    aliases: ['greroll', 'givewayreroll'],
    usage: 'reroll',
    perms: `\`ADMINISTRATOR\``,

    async execute(message, args, client, lang) {

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

        if(!args[0]){
            return message.lineReply(`${emojis.ticket} ${lang.gwWW}`);
        }



        if(!args.lenght > 0) {
            message.channel.messages.fetch(db.get(`last${message.guild.id}`)).then(m => {
                if(!m) return message.lineReply(`${emojis.alert} ${lang.reG} \`prefix + greroll + <message id>\``);
                winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
                message.channel.send(`${emojis.gw} ${lang.neww} ${winner}! ${lang.con}`)
            })
                } else {
            message.channel.messages.fetch(args[0]).then(m => {
                if(!m) return message.channel.send(`${emojis.no} ${lang.reG} \`prefix + greroll + <message id>\``);
                if (m.reactions.cache.get("🎉").count <= 1) {
                    message.channel(`${emojis.no} ${lang.gwError}`)
                }
                if(db.get(`imposer${message.guild.id}`) !== null) {
                    winner = message.guild.members.cache.get(db.get(`imposer${message.guild.id}`))
                    if(!winner) return winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                } else if(db.get(`vocal${message.guild.id}`) === true) {
                    winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.voice).random()
                } else {
                    winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
                }  message.channel.send(`${lang.emojis} ${lang.neww} ${winner}! ${lang.con}`)
            })
                }
   
    },
};