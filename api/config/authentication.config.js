const moment = require('moment')
const jwt = require('jwt-simple')

const config = require('./config.json')

let checkToken = (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['authorization'] || '' // Express headers are auto converted to lowercase
    
    if (token == ''){
        return res.status(413).json({
            message: 'Auth token is not supplied'
        })
    } else {
        next();
    }
}

function encodeToken(username) {

    const playload = {
        exp: moment().add(2, 'days').unix(),
        iat: moment().unix(),
        sub: username
    }

    return jwt.encode(playload, config.secret);
}

function decodeToken(token, cb) {

    try {

        const payload = jwt.decode(token, config.secret);
        const now = moment().unix();

        // Check if the token has expired
        if (now > payload.exp) {
            console.log('Token has expired.')
        }

        // Return
        return payload

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    encodeToken,
    decodeToken,
    checkToken
};