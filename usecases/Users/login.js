class login {
    constructor(gateways) {
        this.gateways = gateways;
        for (let i of Object.getOwnPropertyNames(login.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(data, services) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email) {
                    throw new Error("Invalid email");
                }

                if (!data.password) {
                    throw new Error('Invalid password')
                }
                const user = await this.gateways.userGateway.getByFeild('email', data.email);
                if (user.length === 0) {
                    throw new Error('User not found');
                }

                const isValidUser = services.passwordService.comparePassword(data.password, user[0].password);
                if (!isValidUser) {
                    throw new Error("Invalid password");
                }

                const token = services.authService.issue({ id: user[0]._id });

                resolve(token);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = login;
