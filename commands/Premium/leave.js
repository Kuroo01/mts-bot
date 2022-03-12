


const fs = require("fs")
const {
    MessageEmbed
} = require('discord.js');
const {
    emojiAttention,
    blue,
    owner2,
    owner
} = require('../../../config.json');
const db = require("quick.db")
const emojis = require('../../../emojis.json')
const Discord = require('discord.js')

module.exports = {
    name: 'leave',
    aliases: ['leaveserver', 'leaveserv'],
    description: 'Possibilité de les faires leaves',
    usage: 'leave + id serveur',
    perms: `\`OWNER (du bot premium)\``,

    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }

        const WLAlready = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.serverListNoOwner}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        if (db.get(`${message.guild.id}.Owners`) === undefined || db.get(`${message.guild.id}.Owners`) === null) {
            db.push(`${message.guild.id}.Owners`, message.guild.owner.id);
        }

        if (message.author.id === owner2|| message.author.id === owner) {
            
  const guildID = args[0];
    if(isNaN(guildID) || !guildID || guildID.length != 18) {
        return message.lineReply(`${emojis.no} ${lang.LeaveID}`);
        
    } else {
        const guild = client.guilds.cache.get(guildID);
        if(guild === undefined) return message.channel.send(`${emojis.no} ${lang.LeaveNo}`);
        if(!guild.available) return message.channel.send(`${emojis.no} ${lang.LeaveServer}`);

        client.guilds.cache.get(guildID).leave()
        .then(x => {
            console.log(`J'ai quitté le serveur ${x.name} avec la commande leave`);
            message.channel.send(`${emojis.yes} ${lang.LeaveYes}  \`${x.name}\``).catch(() => {});
        })
        .catch(err => {
            console.log(`[ERREUR] Une erreur est survenue lors du processus: \n${err}`);
            message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        })
    }  
    } else {
        return message.lineReply(WLAlready);
    }
    }
    }

