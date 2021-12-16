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

    async execute(data, services) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email) {
                    throw new Error("Email is required");
                }

                if (!data.password) {
                    throw new Error("Password is required");
                }
                const user = await this.gateways.userGateway.getByFeild('email', data.email);

                if (user.length > 0) {
                    throw new Error('User already exist');
                };

                const userData = _.pick(data, [
                    'email',
                    'password',
                    'full_name',
                    'mobile_number',
                ]);

                userData['isVerified'] = false;
                userData['password'] = services.passwordService.convertPassword(userData.password);

                await this.gateways.userGateway.create(userData);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = create;