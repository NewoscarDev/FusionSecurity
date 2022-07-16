const mongoose = require('mongoose')

let pruebaSchema = new mongoose.Schema({
    reason: String,
    guildId: String
})

module.exports = mongoose.model('pruebaSchema', pruebaSchema) //