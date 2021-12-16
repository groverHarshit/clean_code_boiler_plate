const create = require('./create')
const update = require('./update')
const read = require('./read')
const list = require('./list')
const Delete = require('./delete')
const login = require('./login')

const usersUseCase = (gateways) => Object.freeze({
    create: new create(gateways).execute,
    read: new read(gateways).execute,
    update: new update(gateways).execute,
    delete: new Delete(gateways).execute,
    list: new list(gateways).execute,
    login: new login(gateways).execute,
})

module.exports = () => {
    const gateways = require('../../gateways');
    return Object.freeze({
        usersUseCase: usersUseCase(gateways())
    })
}