const assert = require('assert')
const chai = require('chai')
const mongoose = require('mongoose')
const User = require('../model/schema/user.schema').User
const Game = require('../model/schema/game.schema').Game
const Platform = require('../model/schema/platform.schema').Platform
const auth = require('../config/authentication.config')

const server = require('../server').app
var chaiHttp = require('chai-http');
chai.use(chaiHttp)
chai.should()

describe('Games', () => {


    it('Get Game: Should return a game when providing a valid ID', done => {

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

        platform.save().then(() => {
            game.save().then(game => {

                chai.request(server)
                    .get('/games/' + game._id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        assert(res.body._id == game._id)
                        done()
                    })

            })
        })
    })

    it('Get Game: Should return an empty response when game does not exist', done => {

        chai.request(server)
            .get('/games/5c17a5430e963a3974adb0a0')
            .end((err, res) => {
                res.should.have.status(200)
                assert(res.body == null)
                done()
            })

    })

    it('Add Game: Should add a game when providing valid information', done => {

        // Create a user
        const user = new User({
            "username": "MarcoTest",
            "password": "Test1234"
        })

        const platform = new Platform({
            "abb": "NES",
            "name": "Nintendo Emulation System",
            "description": "Nintendos first console"
        })

        // Save the user
        user.save().then(() => {
            platform.save().then(() => {

                // Create a token for saved user
                let token = auth.encodeToken("MarcoTest")

                Game.count().then(count => {
                    chai.request(server)
                        .post('/games')
                        .send({
                            "title": "Game Title",
                            "description": "Game Description",
                            "cover": "aaa",
                            "platform": "NES",
                            "genre": "Action",
                            "publisher": "Game Publisher",
                            "releaseDate": "2018-01-01"
                        })
                        .set('Authorization', token)
                        .end((err, res) => {
                            Game.count().then(newCount => {
                                res.should.have.status(200)
                                res.should.be.json
                                res.body.should.be.a('object')
                                assert(count + 1 === newCount)
                                done()
                            })
                        })
                })
            })
        })
    })

    it('Add Game: Should return an error when posting a non-existing platform', done => {

        // Create a user
        const user = new User({
            "username": "MarcoTest",
            "password": "Test1234"
        })

        // Save the user
        user.save().then(() => {

            // Create a token for saved user
            let token = auth.encodeToken("MarcoTest")

            Game.count().then(count => {
                chai.request(server)
                    .post('/games')
                    .send({
                        "title": "Game Title",
                        "description": "Game Description",
                        "cover": "aaa",
                        "platform": "NES",
                        "genre": "Action",
                        "publisher": "Game Publisher",
                        "releaseDate": "2018-01-01"
                    })
                    .set('Authorization', token)
                    .end((err, res) => {
                        Game.count().then(newCount => {
                            res.should.have.status(404)
                            res.should.be.json
                            res.body.should.be.a('object')
                            assert(count === newCount)
                            done()
                        })
                    })
            })
        })
    })

    it('Edit Game: Should save the game when providing valid information', done => {

        const user = new User({
            "username": "MarcoTest",
            "password": "Test1234"
        })

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

        platform.save().then(() => {
            game.save().then(game => {
                user.save().then(() => {

                    // Create a token for saved user
                    let token = auth.encodeToken("MarcoTest")

                    Game.count().then(count => {
                        chai.request(server)
                            .put('/games')
                            .send({
                                "id": game._id,
                                "title": "Game Title",
                                "description": "Game Description",
                                "cover": "aaa",
                                "platform": platform._id,
                                "genre": "Action",
                                "publisher": "Game Publisher",
                                "releaseDate": "2018-01-01"
                            })
                            .set('Authorization', token)
                            .end((err, res) => {
                                res.should.have.status(200)
                                res.should.be.json
                                done()
                            })
                    })
                })
            })
        })

    })

})