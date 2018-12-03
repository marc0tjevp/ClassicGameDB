var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

var experienceSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    date: {
        type: Date,
        required: true
    }

})

const Experience = mongoose.model('experience', experienceSchema)

module.exports = {
    Experience,
    experienceSchema
}