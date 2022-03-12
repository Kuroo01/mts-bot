module.exports = {
  name: 'botinfo',
  aliases: ['bi'],
  description: "Permet d'avoir les informations sur le bot discord",
  usage: 'botinfo',
  perms: `\`SEND_MESSAGES\``,

  async execute(message, args, client, lang) {

  const config = require('../../../config.json')
  const emojis = require('../../../emojis.json')
  const discord = require('discord.js');
  const disbut = require('discord-buttons');
const os = require('os');
const cpuStat = require('cpu-stat');
const moment = require('moment');
const db = require("quick.db")
const {
  emojiAttention,
  blue,
  owner
} = require('../../../config.json');

let color;
if (db.get(`${message.guild.id}.Color`)) {
    color = db.get(`${message.guild.id}.Color`)
} else {
    color = blue;
}


  



  let myembed = new discord.MessageEmbed()
        .setTitle(`Bot Information : **(${client.user.username})**`)
        .setColor(color)
        .setThumbnail(client.user.displayAvatarURL())
        //  .addField(`🤖 » ${lang.botinfoCreator} `, '<@853026495923355648>', true)
        .addField(`📆 » ${lang.botinfoDate} `, `${moment(client.user.createdAt).format('DD/MM/YYYY HH:mm:ss')}`, true)
        .addField(`⏲ » ${lang.botinfoOnline} `, `${Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30} Jours, ${Math.round(client.uptime/ (1000 * 60 * 60))} h, ${Math.round(client.uptime / (1000 * 60)) % 60} min, et ${Math.round(client.uptime / 1000) % 60} sec`, true)
        .addField(`🌐 » ${lang.botinfoServers} `, `${client.guilds.cache.size}`, true)
        .addField(`💭 » ${lang.botinfoDiscordJS} `, `v12.5.3`, true)
        .addField(`💭 » Node `, `${process.version}`, true)
        .addField(`💾 » ${lang.botinfoRAM} `, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
        .addField(`💻 » CPU `, `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
        .addField(`🔋 » ${lang.botinfoCPU} `, `1.98%`, true)
        .addField(`📊 » ${lang.botinfoArchitecture} `, `\`${os.arch()}\``, true)
        .addField(`📈 » ${lang.botinfoPlateforme} `, `\`\`${os.platform()}\`\``, true)
        .addField(`📋 » Language `, '**`JavaScript`**')
        .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

  let btn = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel(`🔗 Invite (0 Permissions)`) 
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=892184812117454859&permissions=8&scope=bot`)

let btn2 = new disbut.MessageButton()
  .setStyle('url')
  .setLabel(`🔧 Invite (Admin Permissions)`)
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=892184812117454859&permissions=8&scope=bot`)

  let button2 = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('⚙️ Support') 
  .setURL(`https://discord.gg/`)

let button3 = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('💌 Vote') 
  .setURL(``)

  message.channel.send(myembed, {
  buttons: [btn, btn2, button2, button3]
})
}

};