class get {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(get.prototype)) {
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
                    throw new Error('Pump not found');
                }

                resolve(pump);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = get;
