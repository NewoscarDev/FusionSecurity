const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientid, token} = require('./config.json')

const rest = new REST({ version: '9'}).setToken(token)

createSlash()

async function createSlash() {
    try {
        const commands = []
        fs.readdirSync('./commands').forEach(async (category) => {
            const commandFiles = fs.readdirSync(`./commands/${category}`).filter((archivo) => archivo.endsWith('.js'))
            for (const archivo of commandFiles) {
                const command = require(`./commands/${category}/${archivo}`)
                commands.push(command.data.toJSON())
            }
        })
        await rest.put(
            Routes.applicationCommands(clientid),
            { body : commands }
        )

        console.log('Los SlashCommands han sido cargados correctamente ✅')
    } catch(e) {
        console.error(e)
    }
}


