class get {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(get.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(id, tokenUser = null) {
        return new Promise(async (resolve, reject) => {
            try {
                if (tokenUser) {
                    return resolve(tokenUser);
                }
                const user = await this.gateways.userGateway.read(id);
                if (!user) {
                    throw new Error('User not found');
                }

                delete user.password;

                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = get;
