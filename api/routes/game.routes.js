let routes = require('express').Router()
let controller = require('../controller/game.controller')

routes.get('/', controller.getAllGames)

routes.get('/:id', controller.getGameByID)

routes.post('/', controller.createGame)

routes.put('/', controller.editGame)

module.exports = routes