const Game = require('../model/schema/game.schema').Game
const User = require('../model/schema/user.schema').User
const ApiResponse = require('../model/response/api.response')
const Platform = require('../model/schema/platform.schema')
const Changelog = require('../model/schema/changelog.schema').Changelog
const auth = require('../config/authentication.config')

function getAllGames(req, res) {
    Game.find({}, function (err, games) {
        if (err) {
            res.status(500).json(err).end()
        } else {
            res.status(200).json(games).end()
        }
    })
}

function getGameByID(req, res) {

    // Get ID
    let id = req.params.id || ''

    // Check if ID is present
    if (id == '') {
        res.status(412).json("not found").end()
    }

    Game.findOne({
            _id: id
        },
        function (err, game) {
            if (err) {
                res.status(500).json(err).end()
            }
        }).populate('experiences.user', {
        password: 0
    }).exec(function (err, game) {
        res.status(200).json(game).end()
    })
}

function editGame(req, res) {

    // Get ID
    let id = req.body.id || ''

    // Check if ID is present
    if (id == '') {
        res.status(404).json("not found").end()
    }

    Game.findOne({
            _id: id
        },
        function (err, game) {

            if (err) {
                res.status(500).json(err).end()
            }

            if (!game) {
                res.status(404).json("Not found").end()
            }

            // Get params from body, if they don't exist use old values
            let title = req.body.title || game.title
            let description = req.body.description || game.description
            let platform = req.body.platform || game.platform
            let genre = req.body.genre || game.genre
            let publisher = req.body.publisher || game.publisher
            let releaseDate = req.body.releaseDate || game.releaseDate

            // Remember the old game
            let oldgame = game;

            // Set new params if present
            game.title = title
            game.description = description
            game.platform = platform
            game.genre = genre
            game.publisher = publisher
            game.releaseDate = releaseDate

            // Get User
            var token = req.get('Authorization') || ''
            var decodedUsername
            if (token != '') {
                decodedUsername = auth.decodeToken(token)
            }

            User.findOne({
                username: decodedUsername.sub
            }, function (error, foundUser) {
                if (err) {
                    res.status(404).json("User does not exist").end()
                } else {
                    // Save the game and changelog
                    game.save(function (err) {
                        if (err) {
                            res.status(500).json(err).end()
                        } else {
                            const changelog = new Changelog({
                                user: foundUser._id,
                                game: game._id,
                                date: new Date(),
                                oldgame: oldgame,
                                newgame: game
                            })
                            res.status(200).json("Updated").end()
                        }
                    })
                }
            })
        })
}

function getAllGamesByPlatform(req, res) {

    // Get abbreviation
    let abb = req.params.abb || ''

    // Check if abbreviation is present
    if (abb == '') {
        res.status(412).json("No abb").end()
    }

    Platform.findOne({
            abb: abb
        },
        function (err, platform) {

            if (err) {
                res.status(500).json(err).end()
            }

            if (!platform) {
                res.status(404).json("Platform does not exist").end()
            }

            Game.find({
                    platform: platform._id
                },
                function (err, games) {
                    if (err) {
                        res.status(500).json(err).end()
                    } else {
                        res.status(200).json(games).end()
                    }
                })
        })
}

function createGame(req, res) {

    let title = req.body.title || ''
    let description = req.body.description || ''
    let cover = req.body.cover || ''
    let platform = req.body.platform || ''
    let genre = req.body.genre || ''
    let publisher = req.body.publisher || ''
    let releaseDate = req.body.releaseDate || ''

    Platform.findOne({
        abb: platform
    }, function (err, platform) {
        if (!platform) {
            res.status(404).json(new ApiResponse(404, "Couldn't find a platform with the abbreviation: " + req.body.platform)).end()
        } else {

            const game = new Game({
                title: title,
                description: description,
                cover: cover,
                genre: genre,
                platform: platform,
                publisher: publisher,
                releaseDate: releaseDate
            })

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

module.exports = {
    getAllGames,
    createGame,
    editGame,
    getGameByID,
    getAllGamesByPlatform
}