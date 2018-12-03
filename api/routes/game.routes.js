let routes = require('express').Router()
let controller = require('../controller/game.controller')

routes.get('/', controller.getAllGames)

routes.get('/:id', controller.getGameByID)

routes.post('/', controller.createGame)

routes.put('/', controller.editGame)

routes.post('/:id/experience', controller.addExperience)

routes.get('/:id/experience', controller.getExperienceByGame)

routes.put('/:id/experience/:experienceId', controller.editExperience)


module.exports = routes