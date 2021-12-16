const create = require('./create')
const update = require('./update')
const read = require('./read')
const list = require('./list')
const Delete = require('./delete')

const bookingsUseCase = (gateways) => Object.freeze({
    create: new create(gateways).execute,
    read: new read(gateways).execute,
    update: new update(gateways).execute,
    delete: new Delete(gateways).execute,
    list: new list(gateways).execute,
});

module.exports = () => {
    const gateways = require('../../gateways');
    return Object.freeze({
        pumpUseCase: bookingsUseCase(gateways())
    })
}