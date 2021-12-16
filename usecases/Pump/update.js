const _ = require('lodash');

class update {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(update.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const pump = await this.gateways.pumpGateway.read(id);

                if (!pump) {
                    throw new Error('Pump does not exist');
                };

                const pumpData = _.pick(data, [
                    'name',
                    'location',
                    'address',
                    'filling_types',
                ])

                await this.gateways.pumpGateway.update(id, pumpData);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = update;
