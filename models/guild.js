const mongoose = require('mongoose')

const model = new mongoose.Schema({
        guildId: { 
            type: String 
        },
        lang: { 
            type: String 
        },

        isPremium: { 
            type: mongoose.SchemaTypes.String, 
            required: false, 
            default: false 
        },
        premium: {
      
          redeemedBy: {
             id: {
                 type: mongoose.SchemaTypes.String, 
                 default: null
             },
             tag: {
                 type: mongoose.SchemaTypes.String, 
                 default: null
             },
          },
    
          redeemedAt: {
              type: mongoose.SchemaTypes.String, 
              default: null
          },
    
          expiresAt: {
              type: mongoose.SchemaTypes.String, 
              default: null
        },
    
          plan: {
              type: mongoose.SchemaTypes.String, 
              default: null
        },
    
    },

    }, 
    { 
        collection: 'Guilds'
    }
)

module.exports = mongoose.model('Guilds', model)