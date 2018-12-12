const Game = require('../model/schema/game.schema').Game
const Experience = require('../model/schema/experience.schema').Experience
const ApiResponse = require('../model/response/api.response')
const auth = require('../config/authentication.config')
const User = require('../model/schema/user.schema').User

function addExperience(req, res) {

    let content = req.body.content || ''
    let date = new Date()
    let rating = req.body.rating || ''
    let game = req.params.id || ''

    if (content == '' || rating == '') {
        res.status(412).json(new ApiResponse(412, "Please provide parameters: content, user")).end()
    }

    var token = req.get('Authorization') || ''
	var decodedUsername
	if (token != '') {
		decodedUsername = auth.decodeToken(token)
    }

    User.findOne({
        username: decodedUsername.sub
    },

    function (error, foundUser) {

        // If we couldn't find that user, return a 404
        if (!foundUser) {
            res.status(404).json(new ApiResponse(404, "Couldn't find a user")).end()
        }

        if (error) {
            res.status(500).end()
        }

        // User is found
        else { 

            experience = new Experience({
                user: foundUser._id,
                content: content,
                date: date,
                rating: rating
            })
        
            Game.findOne({
                    _id: game
                },
                function (err, game) {
                    if (err) {
                        res.status(500).json(err).end()
                    } else {
        
                        game.experiences.push(experience)
        
                        game.save(function (err) {
                            if (err) {
                                res.status(500).json(err).end()
                            } else {
                                res.status(200).json(game).end()
                            }
                        })
                    }
                })

        }
    })

}

function getExperienceByGame(req, res) {

    let game = req.params.id || ''

    Game.findOne({
            _id: game
        },
        function (err, game) {
            if (!game) {
                res.status(412).json(new ApiResponse(412, "No game with ID: " + req.params.id)).end()
            } else {
                if (err) {
                    res.status(500).json(err).end()
                } else {
                    res.status(200).json(game.experiences).end()
                }
            }
        }).populate('user')
}

function editExperience(req, res) {

    let game = req.params.id || ''
    let experience = req.params.experienceId || ''

    let content = req.body.content || ''
    let rating = req.body.rating || ''

    if (content == '' || rating == '') {
        res.status(412).json(new ApiResponse(412, "Please provide parameters: content, rating")).end()
    }

    Game.findOneAndUpdate({
        "_id": game,
        "experiences._id": experience
    }, {
        "$set": {
            "experiences.$.content": content,
            "experiences.$.rating": rating
        }
    }, {
        new: true
    }, function (err, doc) {
        if (err) {
            res.status(500).json(new ApiResponse(500, err)).end()
        } else {
            res.status(200).json(doc.experiences).end()
        }
    })

}

module.exports = {
    editExperience,
    addExperience,
    getExperienceByGame
}