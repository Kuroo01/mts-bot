/* eslint-disable no-undef */
const {
    MessageEmbed,
} = require('discord.js');
const {
    blue,
    emojiAttention,
    prefix
} = require('../../../config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const emojis = require('../../../emojis.json')
module.exports = {
    name: 'help',
    description: 'Envoie la liste des commandes',
    aliases: ['help'],
    usage: 'help',
    perms: `\`SEND_MESSAGES\``,

    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }

        let prefixbot;
        if (db.get(`${message.guild.id}.prefix`)) {
            prefixbot = db.get(`${message.guild.id}.prefix`)
        } else {
            prefixbot = prefix
        }

        if (args[0]) {
            const command = client.commands.get(args[0])
            if (command === undefined) return

            const embedhelpcommande = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(
                    `**${lang.HelpCommandName}** ${lang.commands[command.name.toLowerCase()].name}\n` +
                    `**Alias :** ${lang.commands[command.name.toLowerCase()].aliases.join(' | ')} \n` +
                    `**${lang.HelpCommandDescription}** ${lang.commands[command.name.toLowerCase()].description}\n` +
                    `**${lang.HelpCommandUtilisation}** ${prefixbot}${lang.commands[command.name.toLowerCase()].usage} \n` +
                    `**${lang.HelpCommandPerms}** ${lang.commands[command.name.toLowerCase()].perms}`
                )
                .setTimestamp()
                .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);
            message.channel.send(embedhelpcommande);

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(color)
        .setAuthor("📃 • Page d'aide du Bot Aylow")
                .setDescription(` ${lang.helpprefix} **${prefixbot}**\n ${lang.helpdesc} **${client.commands.size}**` )
                .addField(`${emojis.staff}・**${lang.HelpDescriptionCategoryAdministration}**`,"\`embed\`, \`banlist\`, \`adminlist\`, \`vocal\`, \`addemoji\`, \`prefix\`, \`language\`, \`color\`, \`gstart\`, \`greroll\` \`setlogs\`, \`logs\`, \`setmuterole\`, \`sanction\`, \`setup\`, \`tempvocal\`, \`ticket\`, \`rolereaction\`, \`owner\`, \`whitelist\`, \`wl\`, \`wlc\`, \`antiw (antiword config)\`, \`config\`,  \`massadd\`\, \`massremove\`")
                .addField(`${emojis.user}・**${lang.HelpDescriptionCategoryWhitelist}**`," \`secur\`, \`secur-max (on/off)\`, \`secur-opti (on/off)\`, \`Antispam\`, \`Antilink\`, \`Antiwebhook\`, \`Antiban\`, \`Antichannel\`, \`Antieveryone\`, \`Antirole\`, \`Antibot\`, \`Antiword\`, \`logsban\`, \`logsc\`, \`logsmsg\`, \`logsroles\`\, \`deletewebhooks\`\,")
                .addField(`${emojis.settings} ・**${lang.HelpDescriptionCategoryUtils}**`,"\`help\`, \`pic\`, \`ping\`, \`userinfo\`, \`serverinfo\`, \`botinfo\`, \`warnings\`, \`invite\`, \`snipe\`")
                .addField(`${emojis.membre}・**${lang.HelpDescriptionCategoryModeration}**`,"\`derank\`, \`kick\`, \`ban\`, \`unban\`, \`mute\`, \`tempmute\`, \`unmute\`, \`warn\`, \`resetwarns\`, \`lock\`, \`unlock\`, \`renew\`, \`clear\`, \`rolecheck\`")
                .addField(`${emojis.couronne}・**${lang.HelpDescriptionCategoryOwner}**`,"\`setpic\`, \`setname\`, \`statut\`, \`serverlist\`, \`leave\` \`soutien (config/on)\`")
                
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .setTimestamp()
                .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);
            message.lineReply(embed)

        };
    },
};