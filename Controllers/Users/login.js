class login {
    constructor(useCases, services) {
        this.userUseCase = useCases.userUseCase
        this.services = services;

        for(let i of Object.getOwnPropertyNames(login.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const token = await this.userUseCase.login(req.body, this.services);
            return res.status(200).json({
                success: true,
                message: "Login successful",
                payload: {
                    user_token: token,
                }
            })
        } catch (error) {
            const status = error.message.toLowerCase().includes('not found') ? 400 : 500;
            console.log(error, status)
            return res.status(status).json({
                success: false,
                message: error.message,
            })
        }
    }
}

module.exports = login;
