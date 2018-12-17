const ApiResponse = require('../model/response/api.response')
const auth = require('../config/authentication.config')
const User = require('../model/schema/user.schema').User

function login(req, res) {

    // Get parameters from body
    let uname = req.body.username || ''
    let pass = req.body.password || ''

    // Find user with provided username
    User.findOne({
            username: uname
        },

        function (error, foundUser) {

            // If we couldn't find that user, return a 404
            if (!foundUser) {
                res.status(404).json(new ApiResponse(404, "Couldn't find a user with username " + uname)).end()
            }

            // If the user is found check credentials
            else {

                // Check the password
                if (foundUser.password == pass) {

                    // Encode the username to a token with the secret
                    let token = auth.encodeToken(foundUser.username)

                    // Return the token
                    res.status(200).json(new ApiResponse(200, token)).end()
                }

                // If the users password was not correct, return a message
                else {
                    res.status(401).json(new ApiResponse(401, "Incorrect credentials")).end()
                }

            }
        })

}

function register(req, res) {

    // Get parameters from body
    let uname = req.body.username || ''
    let pass = req.body.password || ''

    // Check if parameters are empty
    if (uname != '' || pass != '') {

        // Create a model
        const user = new User({
            username: uname,
            password: pass
        })

        // Check if the username already exists with a pre-hook
        User.count({
                username: user.username
            },

            function (err, count) {

                // If results, the username exists
                if (count > 0) {
                    res.status(422).json(new ApiResponse(422, "Username is already taken, sorry")).end()
                }

                // Username is not taken yet, insert the new user
                else {
                    user.save().then(
                        res.status(200).json(new ApiResponse(200, {_id: user._id ,username: user.username})).end()
                    )
                }
            })
    }

    // Send message if parameters are empty
    else {
        res.status(412).json(new ApiResponse(412, "Please enter a username and password")).end()
    }

}

function getUser(req, res) {

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
            res.status(200).json(foundUser).end()
        }
    })


}

module.exports = {
    login,
    register,
    getUser
}