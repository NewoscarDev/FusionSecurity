const mongoose = require("mongoose");

const suggest = new mongoose.Schema({
  guildId: String,
  channel: String,
})

module.exports = mongoose.model('sugs', suggest)