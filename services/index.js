const authService = require('./auth.service')
const multerService = require('./multer.service')
const passwordService = require('./password.service')

module.exports = {
    passwordService,
    multerService,
    authService
};