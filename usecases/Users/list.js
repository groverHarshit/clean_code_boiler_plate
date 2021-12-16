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

                if (Object.keys(filter).indexOf('blocked') === -1 || Object.keys(filter).indexOf('deleted') === -1) {
                    filter['deleted'] = false;
                } else if (Object.keys(filter).indexOf('blocked') > 0) {
                    filter['deleted'] = filter.blocked;
                    delete filter.blocked;
                }

                const { payload, count } = await this.gateways.userGateway.list({
                    ...filter,
                    skip,
                    limit,
                    sort
                });

                payload.map(user => delete user._doc.password);

                resolve({ userList: payload, count })
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = list;
