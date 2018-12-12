var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var platformSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    abb: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String
    },

    description: {
        type: String,
        required: false
    }

})

const Platform = mongoose.model('platform', platformSchema)

module.exports = Platform