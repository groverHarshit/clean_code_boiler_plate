class list {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(list.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const skip = filter.pageNo && filter.pageLength ? (parseInt(filter.pageNo) - 1) * parseInt(filter.pageLength) : 0;
                const limit = parseInt(filter.pageLength) || 10;
                const sort = filter.sort || { createdAt: -1 };

                const { payload, count } = await this.gateways.bookingGateway.list({
                    ...filter,
                    skip,
                    limit,
                    sort
                });

                for (let booking of payload) {
                    booking._doc.pump = await this.gateways.pumpGateway.read(booking.pumpId);
                    booking._doc.user = await this.gateways.userGateway.read(booking.userId);

                    delete booking._doc.user._doc.password;
                    delete booking._doc.pumpId;
                    delete booking._doc.userId;
                }

                resolve({ bookingListing: payload, count })
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = list;
