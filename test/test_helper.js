const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {

    mongoose.connect('mongodb://localhost/cgdb_test', {
        useNewUrlParser: true
    })

    mongoose.connection
        .once('open', () => {
            done()
        })
        .on('error', (error) => {
            console.warn('Warning:', error)
            done()
        })
})

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        mongoose.connection.collections.games.drop(() => {
            mongoose.connection.collections.platforms.drop(() => {
                done()
            })
        })
    })
})