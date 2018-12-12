let routes = require('express').Router()
let authen = require('../config/authentication.config')
let auth = require('../controller/auth.controller')

routes.post('/login', auth.login)

routes.post('/register', auth.register)

routes.get('/', authen.checkToken, auth.getUser)


module.exports = routes