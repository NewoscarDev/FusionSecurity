const {Client, Intents, Collection, message} = require('discord.js') // no hace falta que pongas eso de Discord porque no lo definiste en los intents porque me sa error si no
require('dotenv').config()
const config = require('./config.json')
const { join } = require('path')
const { setInterval } = require('timers')

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, //Cambio en el intent
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS //Cambio en el intent
     ]})


//  --------------------  SISTEMA DE NIVELES  --------------------------
client.on("messageCreate", async (message) => {
    if(message.author.bot) return;


    const levels = require("./models/levelsSchema")
    const data = await levels.findOne({ guildId: message.guild.id, userId: message.author.id })
    let randomXp
    if(message.content.length <= 5){
        randomXp = Math.floor(Math.random() * 3) + 1
    } else if(message.content.length >= 5 && message.content.length <= 30){
        randomXp = Math.floor(Math.random() * 20) + 1
    } else if(message.content.length >= 30 && message.content.length <= 50 ){
        randomXp = Math.floor(Math.random() * 45) + 1
    } else if(message.content.length >= 50 && message.content.length <= 70){
        randomXp = Math.floor(Math.random() * 60) + 1
    } else if(message.content.length >= 70 && message.content.length <= 80){
        randomXp = Math.floor(Math.random() * 70) + 1
    } else if(message.content.length > 80){
        randomXp = Math.floor(Math.random() * 75) + 1
    }

    console.log(`Random XP: ${randomXp}`)

    if(!data){
        const newdata = new levels({
            guildId: message.guild.id,
            userId: message.author.id,
            xp: randomXp
        })

        return await newdata.save()
    }

    const xpTotal = data.xp + randomXp
    console.log(`XP Total: ${xpTotal
    }`)
    console.log(`Limite: ${data.limit}`)


    if(xpTotal >= data.limit){
        message.channel.send(`¡Felicidades, **${message.author.username}**! Has llegado al nivel **${data.level + 1}**`)
        return await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal, level: data.level + 1, limit: data.limit + 150})
    }

     await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal })

})

  



//  ---------------------SORTEOS DISCORD-GIVEAWAYS-NPM--------------------



     const  {GiveawaysManager}  = require('discord-giveaways');
    // Starts updating currents giveaways
    const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: 'GREEN',
        embedColorEnd: 'BLUE',
        reaction: '🎉'
    }
    });
    // We now have a giveawaysManager property to access the manager everywhere!
    client.giveawaysManager = manager;

//  ----------------------------------------------------------------------------    


    
//  ---------------Juegos desactualizado---------------------------------
const { readdirSync } = require('fs')

const Distube = require("distube")
const { isAwaitExpression } = require('typescript')
const { id } = require('common-tags')
client.distube = new Distube.default(client)
for(const file of readdirSync('./eventos_distube/')){
    if(file.endsWith('.js')){
        let fileName = file.substring(0, file.length - 3)
        let fileContents = require(`./eventos_distube/${file}`)
        client.distube.on(fileName, fileContents.bind(null, client))
    }
}
//  ---------------------------------------------------------------------



//  ------------------ CONFIGURACION CAMBIO DE IDIOMA EN LOS MENSAGES ------------

client.commands = new Collection()
client.config = require('./config.json')
client.selectMenus = new Collection()
client.languages = require('i18n')

client.languages.configure({
    locales: ['en', 'es'],
    directory: join(__dirname, "locales"),
    defaultLocale: 'es',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function (msg) {
        console.log('WARN' + msg)
    },

    logErrorFn: function (msg) {
        console.log('ERROR' + msg)
    },

    missingKeyFn: function (locale, value) {
        return value
    },

    mustacheConfig: {
        tags: ["{{", "}}"],
        disable: false
    }
})

//  ---------------------------------------------------------------------------------------------------


 
//  -------------------------Estado del bot-----------------------------------------------------------

setInterval(() => {
    updateStatus()
}, 60000)

async function updateStatus() {
    const guildNum = await client.guilds.cache.size
    const memberNum = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

    //await client.user.setActivity(`En constantes actualizaciones`, { type: "LISTENING"})
    //await client.user.setActivity(`En pruebas`, { type: "LISTENING"})
    await client.user.setActivity(`Servidores: ${guildNum} Miembros: ${memberNum}`, {  type: "STREAMING",
    url: "https://www.twitch.tv/newoscaryt"
   })
   //await client.user.setActivity(`En mantenimiento / In mantenimance`, {  type: "STREAMING",
    //url: "https://www.twitch.tv/newoscaryt"
   //})
    
    //await client.user.setActivity(`Servidores: ${guildNum} Miembros: ${memberNum}`, { type: "WATCHING"},)
}

//  ------------------------------------------------------------------------------------------------------
    

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);
require("./handlers/selectmenus.js")(client);







client.login(config.token)

