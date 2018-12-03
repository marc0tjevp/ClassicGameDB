const Game = require('../model/schema/game.schema').Game

function getAllGames(req, res) {
    Game.find({}, {
        cover: 0
    }, function (err, games) {
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
            } else {
                res.status(200).json(game).end()
            }
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

            // TODO: Check params and include update for cover

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

            // Set new params if present
            game.title = title
            game.description = description
            game.platform = platform
            game.genre = genre
            game.publisher = publisher
            game.releaseDate = releaseDate

            // Save the game
            game.save(function (err) {
                if (err) {
                    res.status(500).json(err).end()
                } else {
                    res.status(200).json("Updated").end()
                }
            })

        })
}

function createGame(req, res) {

    let title = req.body.title || ''
    let description = req.body.description || ''
    let cover = req.files.cover.data
    let platform = req.body.platform || ''
    let genre = req.body.genre || ''
    let publisher = req.body.publisher || ''
    let releaseDate = req.body.releaseDate || ''

    const game = new Game({
        title: title,
        description: description,
        cover: new Buffer(cover).toString('base64'),
        genre: genre,
        publisher: publisher,
        releaseDate: releaseDate
    })

    console.log(game.cover)

    game.save(function (err) {
        if (err) {
            res.status(500).json(err).end()
        } else {
            res.status(200).json(game).end()
        }
    })

}

module.exports = {
    getAllGames,
    createGame,
    editGame,
    getGameByID
}