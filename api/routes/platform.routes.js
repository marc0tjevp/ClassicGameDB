let routes = require('express').Router()
let controller = require('../controller/platform.controller')

routes.post('/', controller.createPlatform)

module.exports = routes