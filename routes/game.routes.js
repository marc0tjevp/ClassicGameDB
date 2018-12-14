let routes = require('express').Router()
let controller = require('../controller/game.controller')
let auth = require('../config/authentication.config')

routes.get('/', controller.getAllGames)

routes.get('/:id', controller.getGameByID)

routes.get('/platform/:abb', controller.getAllGamesByPlatform)

routes.post('/', auth.checkToken, controller.createGame)

routes.put('/', auth.checkToken, controller.editGame)

module.exports = routes