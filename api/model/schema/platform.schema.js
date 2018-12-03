var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var platformSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

})

const Platform = mongoose.model('platform', platformSchema)

module.exports = Platform