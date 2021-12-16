const Users = require('./Users');
const Pump = require('./Pump');
const Bookings = require('./Bookings');

module.exports = {
    UserController: Users().UserController,
    PumpController: Pump().PumpController,
    BookingsController: Bookings().BookingsController,
}