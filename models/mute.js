const mongoose = require('mongoose')

const mute = new mongoose.Schema({
    rolId: String,
    guildId: String
}
)

module.exports = mongoose.model('rolemute', mute)