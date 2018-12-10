const Platform = require('../model/schema/platform.schema')
const ApiResponse = require('../model/response/api.response')

function getAllPlatforms(req, res) {
    Platform.find({}, function (err, platforms) {
        if (err) {
            res.status(500).json(err).end()
        } else {
            res.status(200).json(platforms).end()
        }
    })
}

function createPlatform(req, res) {

    let name = req.body.name || ''
    let description = req.body.description || ''
    let abb = req.body.abb || ''

    if (name == '' || description == '' || abb == '') {
        res.status(412).json(new ApiResponse(412, "Please provide parameters: name, description")).end()
    }

    const platform = new Platform({
        name: name,
        abb: abb,
        description, description
    })

    console.log(platform)

    platform.save(function (err) {
        if (err) {
            res.status(500).json(err).end()
        } else {
            res.status(200).json(platform).end()
        }
    })

}

module.exports = {
    getAllPlatforms,
    createPlatform
}
