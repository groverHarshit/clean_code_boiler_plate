class create {
    constructor(useCases, services) {
        this.userUseCase = useCases.userUseCase
        this.services = services;
        
        for(let i of Object.getOwnPropertyNames(create.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            await this.userUseCase.create(req.body, this.services);
            return res.status(200).json({
                success: true,
                message: "User is registered",
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

module.exports = create;