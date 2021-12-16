const _ = require('lodash');

class create {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(create.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data.name)
                if (!data.name) {
                    throw new Error('Pump name is required');
                }
                if (!data.location) {
                    throw new Error('Pump location is required');
                }
                if (!data.address) {
                    throw new Error('Pump address is required');
                }
                if (!data.filling_types) {
                    throw new Error('Pump filling_types is required');
                }
                const pump = await this.gateways.pumpGateway.getByFeild('name', data.name);
                if (pump.length > 0) {
                    throw new Error(`Pump: ${pump[0].name} already exists.`);
                }

                const pumpData = _.pick(data, [
                    'name',
                    'location',
                    'address',
                    'filling_types',
                ])

                await this.gateways.pumpGateway.create(pumpData);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = create;