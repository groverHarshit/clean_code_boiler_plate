class get {
    constructor(useCases) {
        this.pumpUseCase = useCases.pumpUseCase
        for (let i of Object.getOwnPropertyNames(get.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const pump = await this.pumpUseCase.read(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Pump.",
                payload: {
                    pump
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
