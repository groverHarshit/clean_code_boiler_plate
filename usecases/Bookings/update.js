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
                const booking = await this.gateways.bookingGateway.read(id);
                if (!booking) {
                    throw new Error('Booking not found');
                }

                const pump = await this.gateways.pumpGateway.read(data.pumpId);

                if (!pump) {
                    throw new Error('Pump does not exist');
                };

                const vehicles = data.vehicalData;
                delete data.vehicalData;

                data.vehicalData = [];

                vehicles.map(vehicle => {
                    data.vehicalData.push(_.pick(vehicle, [
                        'number',
                        'fillingType',
                    ]))
                })

                const bookingData = _.pick(data, [
                    'pumpId',
                    'bookingDate',
                    'vehicalData'
                ])

                await this.gateways.bookingGateway.update(id, bookingData);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = update;
