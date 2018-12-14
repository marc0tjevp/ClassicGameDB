var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Game = require('./game.schema')

var changelogSchema = new Schema({

    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    game: {
        type: ObjectId,
        ref: 'game',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    oldgame: {
        type: Game,
        required: false
    },

    newgame: {
        type: Game,
        required: true
    }

})

const Changelog = mongoose.model('changelog', changelogSchema)

module.exports = {
    Changelog,
    changelogSchema
}