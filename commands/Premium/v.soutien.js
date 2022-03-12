const db = require('quick.db');
const {
    MessageEmbed
} = require('discord.js');
const {
    emojiAttention,
    owner,
    blue,
    emojiWait
} = require('../../../config.json');
const Discord = require('discord.js');
const emojis = require('../../../emojis.json')

module.exports = {
    name: 'soutien',
    aliases: ['soutien'],
    description: 'Choisis le message et le rôle de la commande soutien',
    usage: 'soutien',
    perms: `\`OWNER (du Discord)\`,  \`OWNERS (choisis avec la commande)\``,

    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }





        const embedbotPerms = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.SoutienErrorBotNoPerms}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        const Nopresencestatutsoutien = new MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} ${lang.SoutienErrorBadRole}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        const rolenotfound = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.SoutienErrorRoleNotFound}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        const rolemanaged = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.SoutienErrorRoleManaged}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        const roleprblm = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.SoutienErrorRoleHighest}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(embedbotPerms)

        const WLAlready = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.SoutienErrorNoOwner}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        if (db.get(`${message.guild.id}.Owners`) === undefined || db.get(`${message.guild.id}.Owners`) === null) {
            db.push(`${message.guild.id}.Owners`, message.guild.owner.id);
        }



        if (!args.length) {
            return message.lineReply(`${emojis.no} ${lang.soutienNo}`)
          }

        if (args[0] === 'on') {
            if (message.author.id === message.guild.owner.id || db.get(`${message.guild.id}.Owners`).includes(message.author.id) || message.author.id === owner) {
                let roleSoutien = (`<@&${db.get(`${message.guild.id}.RoleSoutien`)}>`);
            if (!roleSoutien) {
                roleSoutien = `\`Il y'a aucun rôle\``
            }
    
            let soutienStatut = db.get(`${message.guild.id}.statutchange`);
            if (!soutienStatut) {
                soutienStatut = `\`Aucun\``
            }
        
            const onn = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${lang.soutienP} \`${soutienStatut}\` ${lang.soutienF} ${roleSoutien}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);
            message.channel.send(onn)

        }
     } else {
            message.lineReply(WLAlready)
        }

        if (args[0] === 'config') {
        if (message.author.id === message.guild.owner.id || db.get(`${message.guild.id}.Owners`).includes(message.author.id) || message.author.id === owner) {

            const filterreact = m => m.author.id == message.author.id

            let envoyer;

            let messagestatut;
            if (db.get(`${message.guild.id}.statutchange`)) {
                messagestatut = db.get(`${message.guild.id}.statutchange`)
            } else {
                messagestatut = `${lang.SoutienErrorUndefined}`
            }

            let rolestatutID;
            let rolestatut;
            if (db.get(`${message.guild.id}.RoleSoutien`)) {
                rolestatutID = db.get(`${message.guild.id}.RoleSoutien`)
                rolestatut = message.guild.roles.cache.get(rolestatutID)
            } else {
                rolestatut = `${lang.SoutienErrorUndefined}`
            }


            const embedwait = new MessageEmbed()
                .setColor(color)
                .setDescription(`${emojis.loading} ${lang.SoutienWaitReaction}`)
                .setTimestamp()
                .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

            const embed = new Discord.MessageEmbed()
                .addField(`${emojis.un}`, `• ${lang.SoutienEmbedChoseRole} **${rolestatut}**`, false)
                .addField(`${emojis.deux}`, `• ${lang.SoutienEmbedChoseMessage} \`${messagestatut}\``, false)
                .addField(`${emojis.no}`, `• ${lang.SoutienEmbedCancel}`, false)
                .setTimestamp()
                .setColor(color)
                .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);
            const msg = await message.channel.send(embedwait)
            await msg.react(`${emojis.un}`);
            await sleep(250)
            await msg.react(`${emojis.deux}`);
            await sleep(250)
            await msg.react(`${emojis.no}`);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
            await msg.edit(embed)

            const filter = (reaction, user) => {
                return ['892127213527375952', '892127228467499038', '892090840330145834'].includes(reaction.emoji.id) && user.id === message.author.id;
            };

            const collector1 = msg.createReactionCollector(filter, {
                time: 960000
            });

            collector1.on('collect', async (reaction, user) => {

                if (user.bot) return;
                if (!reaction.message.guild) return;
                if (reaction.message.id == msg.id) {

                    if (reaction.emoji.id === '892127213527375952') {
                        await reaction.users.remove(user.id)
                        message.channel.send(`${lang.SoutienQuestionRole}`)

                        message.channel.awaitMessages(filterreact, {
                                max: 1,
                                time: 120000,
                                errors: ['time']
                            })
                            .then(async (collected) => {

                                const roleRegex = /(<@&(\d{17,19})>)|(^\d{17,19}$)/g
                                if (!collected.first().content || !collected.first().content.match(roleRegex)) {
                                    message.channel.bulkDelete(2)
                                    message.channel.send(Nopresencestatutsoutien).then((mssg) => mssg.delete({
                                        timeout: 5000,
                                    }));
                                    return false;
                                }
                                const role = await message.guild.roles.fetch(collected.first().content.replace(/[<@&>]/g, ''))

                                if (role.managed) {
                                    message.channel.bulkDelete(2)
                                    message.channel.send(rolemanaged).then((mssg) => mssg.delete({
                                        timeout: 5000,
                                    }));
                                    return false;
                                }
                                if (!role) {
                                    message.channel.bulkDelete(2)
                                    message.channel.send(rolenotfound).then((mssg) => mssg.delete({
                                        timeout: 5000,
                                    }));
                                    return false;
                                }
                                if (role.position > message.guild.me.roles.highest.position) {
                                    message.channel.bulkDelete(2)
                                    message.channel.send(roleprblm).then((mssg) => mssg.delete({
                                        timeout: 5000,
                                    }));
                                    return false;
                                }

                                db.set(`${message.guild.id}.RoleSoutien`, collected.first().content.replace(/[<>!&@]/g, ''))
                                message.channel.bulkDelete(2)
                                message.channel.send(`${lang.SoutienReponseRole1} ${collected.first().content}, ${lang.SoutienReponseRole2}`).then((mssg) => mssg.delete({
                                    timeout: 5000,
                                }));
                            })
                            .catch();

                    }

                    if (reaction.emoji.id === '892127228467499038') {
                        await reaction.users.remove(user.id)
                        message.channel.send(`${lang.SoutienQuestionMessage}`)

                        message.channel.awaitMessages(filterreact, {
                                max: 1,
                                time: 120000,
                                errors: ['time']
                            })
                            .then(collected => {
                                if (collected.first().content.length >= 100) {
                                    message.channel.bulkDelete(2)
                                    message.channel.send(`${lang.SoutienQuestionMessageErrorLength}`).then((mssg) => mssg.delete({
                                        timeout: 5000,
                                    }));
                                    return false;
                                }
                                db.set(`${message.guild.id}.statutchange`, collected.first().content)
                                message.channel.bulkDelete(2)
                                message.channel.send(`${lang.SoutienReponseMessage} **${collected.first().content}**, ${lang.SoutienReponseRole2}`).then((mssg) => mssg.delete({
                                    timeout: 5000,
                                }));
                            })
                            .catch();

                    }

                    if (reaction.emoji.id === '892090840330145834') {
                        await reaction.users.remove(user.id)
                        envoyer = 'annuler'
                        return msg.delete().then(
                            message.channel.send(`${lang.SoutienQuestionCancel}`).then((mssg) => mssg.delete({
                                timeout: 5000,
                            })))

                    }
                }
            })
            collector1.on('end', collected => {
                if (envoyer === 'annuler') {
                    return
                } else {
                    return message.channel.send(`${lang.SoutienErrorTime}`)
                }

            })
        } else {
            message.lineReply(WLAlready)
        }
        
    }

        
    }
}