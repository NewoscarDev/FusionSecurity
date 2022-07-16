const mongoose = require('mongoose')

let warnSchema = new mongoose.Schema({
    userId: String,
    guildId: String,
    moderatorId: String,
    reason: String,
    timestamp: String
})

module.exports = mongoose.model('warnsSchema', warnSchema) //