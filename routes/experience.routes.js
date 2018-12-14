let routes = require('express').Router()
let controller = require('../controller/experience.controller')

routes.post('/:id/experience', controller.addExperience)

routes.get('/:id/experience', controller.getExperienceByGame)

routes.put('/:id/experience/:experienceId', controller.editExperience)

module.exports = routes