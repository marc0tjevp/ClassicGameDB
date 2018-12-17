const assert = require('assert')
const chai = require('chai')
const mongoose = require('mongoose')
const User = require('../model/schema/user.schema').User
const auth = require('../config/authentication.config')

const server = require('../server').app
var chaiHttp = require('chai-http');
chai.use(chaiHttp)
chai.should()

describe('Users', () => {

    it('Register: Should register a user with username and password', done => {
        User.count().then(count => {
            chai.request(server)
                .post('/users/register')
                .send({
                    "username": "MarcoTest",
                    "password": "Test1234"
                })
                .end((err, res) => {
                    User.count().then(newCount => {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        assert(count + 1 === newCount)
                        done()
                    })
                })
        })
    })

    it('Register: Should return an 422 if username is already taken', done => {

        const user = new User({
            "username": "MarcoTest",
            "password": "Test1234"
        })

        user.save().then(() => {
            chai.request(server)
                .post('/users/register')
                .send({
                    "username": "MarcoTest",
                    "password": "Test1234"
                })
                .end((err, res) => {
                    res.should.have.status(422)
                    res.should.be.json
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    it('Login: Should return a token when providing valid information', (done) => {

        const user = new User({
            username: 'MarcoTest',
            password: 'Test1234'
        })

        const token = auth.encodeToken("MarcoTest")

        user.save().then(() => {
            chai.request(server)
                .post('/users/login')
                .send({
                    "username": "MarcoTest",
                    "password": "Test1234"
                })
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.should.be.a('object')
                    assert(res.body.message === token)
                    done()
                })
        })
    })

    it('Login: Should return an error if credentials don\'t match', (done) => {

        const user = new User({
            username: 'MarcoTest',
            password: 'Test1234'
        })

        user.save().then(() => {
            chai.request(server)
                .post('/users/login')
                .send({
                    "username": "MarcoTest",
                    "password": "DiffPass123"
                })
                .end(function (err, res) {
                    res.should.have.status(401)
                    res.should.be.json
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

})