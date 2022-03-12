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
emojis = require('../../../emojis.json');
Discord = require("discord.js")
module.exports = {
    name: 'start',
    description: 'Affiche les sécurités du discord',
    aliases: ['gstart', 'giveway', 'givewaystart'],
    usage: 'start',
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
        filter = (reaction, user) => ['🕙', '🏷️','🕵️','🔊','🎁','✅'].includes(reaction.emoji.name) && user.id === message.author.id,
        dureefiltrer = response => { return response.author.id === message.author.id };
     
        const msgembed = new MessageEmbed()
        .setTitle(`${emojis.gw} ${lang.gwTitle} ${message.guild.name}`)
        .setColor(color)
        .setDescription(`${lang.gwDescription}`)
        .addField(`\`🕙\`  ${lang.gwDure}`, `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, true)
        .addField(`\`🏷️\`  ${lang.gwSalon}`, `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, true)
        .addField(`\`🕵️\` ${lang.gwGagnant}`, `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, true)
        .addField(`\`🔊\` ${lang.gwVocal}`, `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwYes}`: `${lang.gwNo}`}`, true)
        .addField(`\`🎁\` Gain`, `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, true)
        .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);


         message.lineReply(msgembed)
         .then(async m => {
     const collector = m.createReactionCollector(filter, { time: 900000 });
     collector.on('collect', async r => { 
         if (r.emoji.name === '🕙') {
             message.lineReply(`🕙  ${lang.gwTimeT}`).then(mp => {
                 mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
                 .then(cld => {
                 var msg = cld.first();
                 if(!msg.content.endsWith("d") && !msg.content.endsWith("h") && !msg.content.endsWith("m")) return message.lineReply(` 🕙 ${lang.gwTimeI}`)
               db.set(`dure${message.guild.id}` ,ms(msg.content))
               msg.delete()
               mp.delete()
                 message.lineReply(`🕙  ${lang.gwTimeC} \`${`${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`}\``)
                 m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, 
                      color: color,
                       description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
             });
             })
         // --
         } else if(r.emoji.name === '🏷️') {
             message.lineReply(`${emojis.ticket} ${lang.gwSalonID}`).then(mp => {
             mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
             .then(cld => {
             var msg = cld.first();
             
             channelID = cld.first().content.replace(/[<>#]/g, '');

            const channel = message.guild.channels.cache.get(channelID);
            // var channel = message.guild.channels.cache.get(msg.content)
             if(!channel) return  message.lineReply(`${emojis.ticket} ${lang.gwSalonNo}`).then(msg => {setTimeout(() => msg.delete(), 5000)})

             db.set(`channel${message.guild.id}` ,channel.id)
             msg.delete()
             mp.delete()
                          message.lineReply(`${emojis.ticket} ${lang.gwSalonChanged} \`${channel.name}\``)
             m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, color: color, description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
             });
             });
         } else if(r.emoji.name === '🕵️') {
             message.lineReply(`🕵️ ${lang.gwID}`).then(mp => {
                 mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
                 .then(cld => {
                     var msg = cld.first();
                     if(msg.content === "off") {
                        db.set(`imposer${message.guild.id}` ,null)
                        message.lineReply(`🕵️ ${lang.gwIdOff}`).then(msg => {setTimeout(() => msg.delete(), 5000)})
                        
                         m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, color: color, description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
                     } else {
                     var users = message.guild.members.cache.get(msg.content)
                     if(!users)  return  message.lineReply(`🕵️ ${lang.gwIDno}`).then(msg => {setTimeout(() => msg.delete(), 5000)})
                     db.set(`imposer${message.guild.id}` ,message.author.id)
                     msg.delete()
                     mp.delete()
                     message.lineReply(`🕵️ ${lang.gwIDD} \`${users.user.username}\``).then(msg => {setTimeout(() => msg.delete(), 5000)})
                     m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, color: color, description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
                     }
                 });
             });
         } else if(r.emoji.name === '🔊') {
            message.lineReply(`${emojis.casque} ${lang.gwVoc}`).then(mp => {
                mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
                .then(cld => {
                    var msg = cld.first();
                    if(msg.content === "off") {
                       db.set(`vocal${message.guild.id}` ,null)
                       msg.delete()
                       mp.delete()
                       message.lineReply(`${emojis.casque} ${lang.gwVocOff}`)
                        m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, color: color, description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
                    } else  if(msg.content === "on") {
                    db.set(`vocal${message.guild.id}` ,true)
                    msg.delete()
                    mp.delete()
                    message.lineReply(`${emojis.casque} ${lang.gwVocOn}`)
                    m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, color: color, description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
                    }
                });
            });         } else if(r.emoji.name === '🎁') {
             message.lineReply(`${emojis.gw} ${lang.gwKado}`).then(mp => {
                 mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
                 .then(cld => {
                 var msg = cld.first();
                 db.set(`gain${message.guild.id}` ,msg.content)
                 msg.delete()
                 mp.delete()
                 message.lineReply(`${emojis.gw} ${lang.gwLots} \`${db.get(`gain${message.guild.id}`)}\`.`)
                 m.edit({ embed: { Title: `${emojis.gw} ${lang.gwTitle} ${message.guild.name}`, color: color, description: `${lang.gwDescription}`, fields: [ {name: `\`🕙\`  ${lang.gwDure}`, value: `${db.get(`dure${message.guild.id}`) === null?   `${lang.gwDe}`: `${ms(db.get(`dure${message.guild.id}`))}`}`, inline: true }, { name: `\`🏷️\`  ${lang.gwSalon}`, value: `${db.get(`channel${message.guild.id}`) === null?   `${lang.gwDe}`:`<#${db.get(`channel${message.guild.id}`)}>`}`, inline: true}, { name: `\`🕵️\` ${lang.gwGagnant}`, value: `${db.get(`imposer${message.guild.id}`) === null?   `${lang.gwDe}`:`<@${db.get(`imposer${message.guild.id}`)}>`}`, inline: true }, { name: `\`🔊\` ${lang.gwVocal}`, value: `${db.get(`vocal${message.guild.id}`) === null? `${lang.gwNo}`: `${lang.gwYes}`}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.get(`gain${message.guild.id}`) === null?   `${lang.gwDe}`:`${db.get(`gain${message.guild.id}`)}`}`, inline: true }   ] } });         
                 });
             });
         } else if(r.emoji.name === '✅') {
             var channel = message.guild.channels.cache.get(db.get(`channel${message.guild.id}`))
             if(!channel) return message.lineReply(` ${emojis.no} ${lang.gwError2}`)
             if(db.get(`dure${message.guild.id}`) === null) return message.lineReply(` ${emojis.no} ${lang.gwError3}`)

             message.lineReply(`${emojis.yes} ${lang.gwLanced} ${channel}.`)
         
            var timestamp = Date.now() + db.get(`dure${message.guild.id}`)
             var embed = new MessageEmbed()
             .setTitle(db.get(`gain${message.guild.id}`))
             .setDescription(`${lang.gwReact}
             ${lang.gwTime} **${ms(db.get(`dure${message.guild.id}`))}**
             ${lang.gwCreated} ${message.author}`)
             .setColor(color)
             .setFooter(`${lang.gwEnd}`)
             .setTimestamp(timestamp)
             var msg = await channel.send(embed)
             msg.react("🎉")
        
             setTimeout(() => {
                 db.set(`last${message.guild.id}`, msg.id)
             if (msg.reactions.cache.get("🎉").count <= 1) {
                 message.channel(`${emojis.no} ${lang.gwError}`)
             }
             if(db.get(`imposer${message.guild.id}`) !== null) {
                 winner = message.guild.members.cache.get(db.get(`imposer${message.guild.id}`))
                 if(!winner) return winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
             } else if(db.get(`vocal${message.guild.id}`) === true) {
                 winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.voice).random()
             } else {
                 winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
             }
             var embed = new MessageEmbed()
             .setTitle(db.get(`gain${message.guild.id}`))
             .setDescription(`
             ${lang.gwWinner} ${winner}
             ${lang.gwCreated} ${message.author}`)
             .setColor(color)
             .setFooter(`${lang.gwFooter}`)
             .setTimestamp(Date.now())
             msg.edit(embed)
             channel.send(`${emojis.gw} ${lang.gwGG} <@${winner.id}> ${lang.gwWins} : **${db.get(`gain${message.guild.id}`)}**`)
             }, db.get(`dure${message.guild.id}`));
         }
         r.users.remove(message.author.id);

     });
     await m.react("🕙")
     await sleep(250);
         await m.react("🏷️")
         await sleep(250);

         await m.react("🕵️")
         await sleep(250);

         await m.react("🔊")
         await sleep(250);

         await m.react("🎁")
         await sleep(250);

         await m.react("✅")
         await sleep(250);

     })
   
    },
};