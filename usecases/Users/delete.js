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
                const user = await this.gateways.userGateway.read(id);
                if (!user) {
                    throw new Error('User does not exist');
                }

                await this.gateways.userGateway.delete(id);

                await this.gateways.bookingGateway.deleteByFeild('userId', id);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Delete;