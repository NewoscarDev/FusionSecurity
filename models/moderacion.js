const mongoose = require("mongoose")

let Schema = new mongoose.Schema({

    guildID: String,
    rolAñadir: String,
    rolQuitar: String,
    antibots: String

})

module.exports = mongoose.model('moderacion', Schema)