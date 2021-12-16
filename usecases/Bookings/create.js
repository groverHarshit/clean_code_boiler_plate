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
                if (!data.pumpId) {
                    throw new Error('Pump id is required');
                }
                if (!data.vehicalData) {
                    throw new Error("Vehical data is reuqired");
                }
                const pump = await this.gateways.pumpGateway.read(data.pumpId);

                if (!pump) {
                    throw new Error('Pump does not exist');
                };

                const vehicles = data.vehicalData;
                delete data.vehicalData;

                data.vehicalData = [];

                if (vehicles && vehicles.length > 0) {
                    vehicles.map(vehicle => {
                        data.vehicalData.push(_.pick(vehicle, [
                            'number',
                            'fillingType',
                        ]))
                    })
                }

                const bookingData = _.pick(data, [
                    'userId',
                    'pumpId',
                    'bookingDate',
                    'vehicalData'
                ])

                await this.gateways.bookingGateway.create(bookingData);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = create;