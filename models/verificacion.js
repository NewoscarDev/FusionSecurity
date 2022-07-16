const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    roleId: {
        type: String,
    },
    channelId: {
        type: String,
    },
    guildId: {
        type: String,
    }
})

module.exports = mongoose.model('verify', Schema);