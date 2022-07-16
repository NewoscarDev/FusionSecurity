const mongoose = require('mongoose')
const config = require('../config.json')

module.exports = {
    name: 'ready',
    execute(client) {
        mongoose.connect(config.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })  
        console.log('El bot se ha iniciado correctamente✅')
        console.log('Slashcomands iniciados correctamente✅')
        console.log('----------------------------')
        console.log('|   FUSION SECURITY BOT    |')
        console.log('----------------------------')
        console.log('| 🏅 Owner: NewoscarYT     |')
        console.log('| 🏅 Owner: Byavt.        |')
        console.log('| 🎨  Designer: Leah                  |')
        console.log('| 🆚 Version: 16.0.0      |')
        console.log(' ')
        console.log(' ')
        console.log('----------------------------')
        console.log('|     FUSION COMANDOS      |')
        console.log('----------------------------')
        console.log('Comandos premium  [✅ ]')
        console.log('Comandos informacion  [✅ ]')
        console.log('Comandos de sugerencias  [✅ ]')
        console.log('Comandos de moderacion  [✅ ]')
        console.log('Comandos de diversion  [✅ ]')
        console.log('Comandos de sorteos  [✅ ]')
        console.log('Comandos de configuracion  [✅ ]')
        console.log('Comandos de tickets  [✅ ]')
        console.log('Comandos de utilidad  [✅ ]')
        console.log('Comandos de musica  [✅ ]')
    } 
}