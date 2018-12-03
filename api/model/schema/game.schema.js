var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Experience = require('./experience.schema')

var gameSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    cover: {
        type: String
    },

    platform: {
        type: ObjectId,
        ref: 'platform',
        required: false
    },

    genre: {
        type: String,
        required: true
    },

    publisher: {
        type: String,
        required: false
    },

    releaseDate: {
        type: Date,
        required: false
    },

    experiences: {
        type: [Experience.experienceSchema]
    }

})

const Game = mongoose.model('game', gameSchema)

module.exports = {
    Game,
    gameSchema
}