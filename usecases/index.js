const bookingsUseCase = require('./Bookings')
const pumpUseCase = require('./Pump')
const userUseCase = require('./Users')

module.exports = () => Object.freeze({
    bookingsUseCase: bookingsUseCase().bookingsUseCase,
    pumpUseCase: pumpUseCase().pumpUseCase,
    userUseCase: userUseCase().usersUseCase,
})