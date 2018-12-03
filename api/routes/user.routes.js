let routes = require('express').Router()
let auth = require('../controller/auth.controller')

routes.post('/login', auth.login)

routes.post('/register', auth.register)

module.exports = routes