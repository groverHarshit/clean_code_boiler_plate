const _ = require('lodash')

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
                const user = await this.gateways.userGateway.read(id);
                if (!user) {
                    throw new Error('User not found');
                }

                const userData = _.pick(data, [
                    'full_name',
                    'mobile_number',
                ]);

                await this.gateways.userGateway.update(id, userData);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = update;
