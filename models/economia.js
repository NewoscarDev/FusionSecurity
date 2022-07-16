const { Schema, model } = require("mongoose")

const economia = new Schema({
    userID: String,
    dinero: {
        type: Number,
        default: 0
    },
    dinerobanco: {
        type: Number,
        default: 0
    }
});

module.exports = model('economia', economia)