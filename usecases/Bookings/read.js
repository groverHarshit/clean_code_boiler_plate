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
                const booking = await this.gateways.bookingGateway.read(id);
                if (!booking) {
                    throw new Error('Booking not found');
                }

                resolve(booking);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = get;
