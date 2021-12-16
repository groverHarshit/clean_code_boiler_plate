const create = require('./create')
const update = require('./update')
const read = require('./read')
const list = require('./list')
const Delete = require('./delete')

const UserController = (usecase, services = {}) => Object.freeze({
    create: new create(usecase, services).execute,
    read: new read(usecase, services).execute,
    update: new update(usecase, services).execute,
    delete: new Delete(usecase, services).execute,
    list: new list(usecase, services).execute,
});

module.exports = () => {
    const pumpUseCase = require('../../usecases')();
    const services = require('../../services');
    return Object.freeze({
        PumpController: UserController(pumpUseCase, services)
    })
}