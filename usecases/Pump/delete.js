class Delete {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(Delete.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const pump = await this.gateways.pumpGateway.read(id);
                if (!pump) {
                    throw new Error('Pump does not exist');
                }

                await this.gateways.pumpGateway.delete(id);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Delete;