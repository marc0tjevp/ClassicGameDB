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

describe('Platforms', () => {


    it('Add Platform: Should add a platform when providing valid information', done => {

        // Create a user
        const user = new User({
            "username": "MarcoTest",
            "password": "Test1234"
        })

        // Save the user
        user.save().then(() => {

            // Create a token for saved user
            let token = auth.encodeToken("MarcoTest")

            Platform.count().then(count => {
                chai.request(server)
                    .post('/platforms')
                    .send({
                        "abb": "NES",
                        "name": "Nintendo Emulation System",
                        "description": "Nintendos first console",
                        "image": "blah"
                    })
                    .set('Authorization', token)
                    .end((err, res) => {
                        Platform.count().then(newCount => {
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