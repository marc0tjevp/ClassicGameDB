const assert = require('assert')
const chai = require('chai')
const mongoose = require('mongoose')
const User = require('../model/schema/user.schema').User
const Game = require('../model/schema/game.schema').Game
const Platform = require('../model/schema/platform.schema').Platform
const Experience = require('../model/schema/experience.schema').Experience
const auth = require('../config/authentication.config')

const server = require('../server').app
var chaiHttp = require('chai-http');
chai.use(chaiHttp)
chai.should()

describe('Experiences', () => {

    it('Add Experience: Should add an XP when providing valid information', done => {

        const platform = new Platform({
            "abb": "NES",
            "name": "Nintendo Emulation System",
            "description": "Nintendos first console"
        })

        const game = new Game({
            "title": "Game Title",
            "description": "Game Description",
            "cover": "aaa",
            "platform": platform._id,
            "genre": "Action",
            "publisher": "Game Publisher",
            "releaseDate": "2018-01-01"
        })

        const user = new User({
            "username": "MarcoTest",
            "password": "Test1234"
        })

        user.save().then(() => {
            platform.save().then(() => {
                game.save().then(game => {

                    // Create a token for saved user
                    let token = auth.encodeToken("MarcoTest")

                    chai.request(server)
                        .post('/games/' + game._id + '/experience')
                        .send({
                            "content": "Wow! Such a nice game. Much graphics",
                            "rating": 5,
                            "game": game._id
                        })
                        .set('Authorization', token)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.should.be.json
                            res.body.should.be.a('object')
                            done()
                        })
                })
            })
        })
    })

})