const db = require("quick.db")
const fs = require("fs");
const Discord = require('discord.js')
const emojis = require('../../../emojis.json')
const {
    emojiAttention,
    blue,
    prefix,
    owner
} = require('../../../config.json');


module.exports = {
    name: 'secur-opti',
    description: 'Affiche les sécurités du discord',
    usage: 'security',
    perms: `\`ADMINISTRATOR\``,

    async execute(message, args, client, lang) {
    let color;
if (db.get(`${message.guild.id}.Color`)) {
    color = db.get(`${message.guild.id}.Color`)
} else {
    color = blue;
}



    
    const WLAlready = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.LangErrorNoOwner}`)
    .setTimestamp()
    .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);
    
    if (!message.guild.owner) return;
    if (!db.get(`${message.guild.id}.WLUsers`).includes(message.author.id)) {
        return message.channel.send(WLAlready);
    }

if (db.get(`${message.guild.id}.Owners`) === undefined || db.get(`${message.guild.id}.Owners`) === null) {
    if (message.guild.owner) {
        db.push(`${message.guild.id}.Owners`, message.guild.owner.id);
    }
}


    if (!args.length) {
      return message.channel.send(`${emojis.alert} ${lang.securopti}`)
    }
  if(args[0] === "on") {

      db.set(`${message.guild.id}.antiban`, true);
      db.set(`${message.guild.id}.antispam`, true);
      db.set(`${message.guild.id}.antilink`, true);
      db.set(`${message.guild.id}.antiwebhook`, true);

      let antispam = db.get(`${message.guild.id}.antispam`);
      if (antispam == undefined) {
          antispam = `${emojis.off}`
      }
      if (antispam == null) {
          antispam = `${emojis.off}`
      }
      if (antispam == true) {
          antispam = `${emojis.on}`
      }
      if (antispam == false) {
          antispam = `${emojis.off}`
      }

      let antilink = db.get(`${message.guild.id}.antilink`);
      if (antilink == undefined) {
          antilink = `${emojis.off}`
      }
      if (antilink == null) {
          antilink = `${emojis.off}`
      }
      if (antilink == true) {
          antilink = `${emojis.on}`
      }
      if (antilink == false) {
          antilink = `${emojis.off}`
      }

      let antiwebhook = db.get(`${message.guild.id}.antiwebhook`);
      if (antiwebhook == undefined) {
          antiwebhook = `${emojis.off}`
      }
      if (antiwebhook == null) {
          antiwebhook = `${emojis.off}`
      }
      if (antiwebhook == true) {
          antiwebhook = `${emojis.on}`
      }
      if (antiwebhook == false) {
          antiwebhook = `${emojis.off}`
      }

      let antiban = db.get(`${message.guild.id}.antiban`);
      if (antiban == undefined) {
          antiban = `${emojis.off} (3 / 1min)`
      }
      if (antiban == null) {
          antiban = `${emojis.off} (3 / 1min)`
      }
      if (antiban == true) {
          antiban = `${emojis.on} (3 / 1min)`
      }
      if (antiban == false) {
          antiban = `${emojis.off}`
      }


      let antirole = db.get(`${message.guild.id}.antiRole`);
      if (antirole == undefined) {
          antirole = `${emojis.off}`
      }
      if (antirole == null) {
          antirole = `${emojis.off}`
      }
      if (antirole == true) {
          antirole = `${emojis.on}`
      }
      if (antirole == false) {
          antirole = `${emojis.off}`
      }

      let antiword = db.get(`${message.guild.id}.antiWordChoice`);
      if (antiword == undefined) {
          antiword = `${emojis.off}`
      }
      if (antiword == null) {
          antiword = `${emojis.off}`
      }
      if (antiword == true) {
          antiword = `${emojis.on}`
      }
      if (antiword == false) {
          antiword = emojiOFF
      }

      let antibot = db.get(`${message.guild.id}.antibot`)
      if (antibot == undefined) {
          antibot = `${emojis.off}`
      }
      if (antibot == null) {
          antibot = `${emojis.off}`
      }
      if (antibot == true) {
          antibot = `${emojis.on}`
      }
      if (antibot == false) {
          antibot = `${emojis.off}`
      }

      let antichannel = db.get(`${message.guild.id}.antiChannel`)
      if (antichannel == undefined) {
          antichannel = `${emojis.off}`
      }
      if (antichannel == null) {
          antichannel = `${emojis.off}`
      }
      if (antichannel == true) {
          antichannel = `${emojis.on}`
      }
      if (antichannel == false) {
          antichannel = `${emojis.off}`
      }

      let antieveryone = db.get(`${message.guild.id}.antieveryone`)
      if (antieveryone == undefined) {
          antieveryone = `${emojis.off} (3 / 1h)`
      }
      if (antieveryone == null) {
          antieveryone = `${emojis.off} (3 / 1h)`
      }
      if (antieveryone == true) {
          antieveryone = `${emojis.on} (3 / 1h)`
      }
      if (antieveryone == false) {
          antieveryone = `${emojis.off}`
      }

      const security = new Discord.MessageEmbed()
          .setTitle(`${lang.SecurityServEmbed}`)
          .setColor(color)
          .setDescription(`• Antispam : ${antispam} \n • Antilink : ${antilink} \n • Antiwebhook : ${antiwebhook} \n • Antiban : ${antiban} \n • Antichannel : ${antichannel} \n • Antieveryone : ${antieveryone} \n • Antirole : ${antirole} \n • Antiword : ${antiword}`)
          .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`)
      message.channel.send(security)




  }
  if(args[0] === "off") {

             db.set(`${message.guild.id}.antiban`, null);
             db.set(`${message.guild.id}.antispam`, null);
             db.set(`${message.guild.id}.antilink`, null);
             db.set(`${message.guild.id}.antiwebhook`, null);

             let antispam = db.get(`${message.guild.id}.antispam`);
             if (antispam == undefined) {
                 antispam = `${emojis.off}`
             }
             if (antispam == null) {
                 antispam = `${emojis.off}`
             }
             if (antispam == true) {
                 antispam = `${emojis.on}`
             }
             if (antispam == false) {
                 antispam = `${emojis.off}`
             }
     
             let antilink = db.get(`${message.guild.id}.antilink`);
             if (antilink == undefined) {
                 antilink = `${emojis.off}`
             }
             if (antilink == null) {
                 antilink = `${emojis.off}`
             }
             if (antilink == true) {
                 antilink = `${emojis.on}`
             }
             if (antilink == false) {
                 antilink = `${emojis.off}`
             }
     
             let antiwebhook = db.get(`${message.guild.id}.antiwebhook`);
             if (antiwebhook == undefined) {
                 antiwebhook = `${emojis.off}`
             }
             if (antiwebhook == null) {
                 antiwebhook = `${emojis.off}`
             }
             if (antiwebhook == true) {
                 antiwebhook = `${emojis.on}`
             }
             if (antiwebhook == false) {
                 antiwebhook = `${emojis.off}`
             }
     
             let antiban = db.get(`${message.guild.id}.antiban`);
             if (antiban == undefined) {
                 antiban = `${emojis.off} (3 / 1min)`
             }
             if (antiban == null) {
                 antiban = `${emojis.off} (3 / 1min)`
             }
             if (antiban == true) {
                 antiban = `${emojis.on} (3 / 1min)`
             }
             if (antiban == false) {
                 antiban = `${emojis.off}`
             }
     
     
             let antirole = db.get(`${message.guild.id}.antiRole`);
             if (antirole == undefined) {
                 antirole = `${emojis.off}`
             }
             if (antirole == null) {
                 antirole = `${emojis.off}`
             }
             if (antirole == true) {
                 antirole = `${emojis.on}`
             }
             if (antirole == false) {
                 antirole = `${emojis.off}`
             }
     
             let antiword = db.get(`${message.guild.id}.antiWordChoice`);
             if (antiword == undefined) {
                 antiword = `${emojis.off}`
             }
             if (antiword == null) {
                 antiword = `${emojis.off}`
             }
             if (antiword == true) {
                 antiword = `${emojis.on}`
             }
             if (antiword == false) {
                 antiword = emojiOFF
             }
     
             let antibot = db.get(`${message.guild.id}.antibot`)
             if (antibot == undefined) {
                 antibot = `${emojis.off}`
             }
             if (antibot == null) {
                 antibot = `${emojis.off}`
             }
             if (antibot == true) {
                 antibot = `${emojis.on}`
             }
             if (antibot == false) {
                 antibot = `${emojis.off}`
             }
     
             let antichannel = db.get(`${message.guild.id}.antiChannel`)
             if (antichannel == undefined) {
                 antichannel = `${emojis.off}`
             }
             if (antichannel == null) {
                 antichannel = `${emojis.off}`
             }
             if (antichannel == true) {
                 antichannel = `${emojis.on}`
             }
             if (antichannel == false) {
                 antichannel = `${emojis.off}`
             }
     
             let antieveryone = db.get(`${message.guild.id}.antieveryone`)
             if (antieveryone == undefined) {
                 antieveryone = `${emojis.off} (3 / 1h)`
             }
             if (antieveryone == null) {
                 antieveryone = `${emojis.off} (3 / 1h)`
             }
             if (antieveryone == true) {
                 antieveryone = `${emojis.on} (3 / 1h)`
             }
             if (antieveryone == false) {
                 antieveryone = `${emojis.off}`
             }
     
             const security = new Discord.MessageEmbed()
                 .setTitle(`${lang.SecurityServEmbed}`)
                 .setColor(color)
                 .setDescription(`• Antispam : ${antispam} \n • Antilink : ${antilink} \n • Antiwebhook : ${antiwebhook} \n • Antiban : ${antiban} \n • Antichannel : ${antichannel} \n • Antieveryone : ${antieveryone} \n • Antirole : ${antirole} \n • Antiword : ${antiword}`)
                 .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`)
             message.channel.send(security)





}

    }
}

