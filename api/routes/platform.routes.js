let routes = require('express').Router()
let controller = require('../controller/platform.controller')

routes.post('/', controller.createPlatform)

routes.get('/', controller.getAllPlatforms)

module.exports = routes