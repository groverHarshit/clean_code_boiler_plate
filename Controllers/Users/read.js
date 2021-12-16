class get {
    constructor(useCases) {
        this.userUseCase = useCases.userUseCase
        for (let i of Object.getOwnPropertyNames(get.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const user = await this.userUseCase.read(req.params.id, req.user);
            return res.status(200).json({
                success: true,
                message: "User.",
                payload: {
                    user
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

module.exports = get;
