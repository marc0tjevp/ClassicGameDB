var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Game = require('./game.schema')

var collectionSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    games: {
        type: [Game.gameSchema]
    }

})

const Game = mongoose.model('game', gameSchema)

module.exports = Game