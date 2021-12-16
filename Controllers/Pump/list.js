class list {
    constructor(useCases) {
        this.pumpUseCase = useCases.pumpUseCase
        for (let i of Object.getOwnPropertyNames(list.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const { pumps, count } = await this.pumpUseCase.list({ ...req.query });
            return res.status(200).json({
                success: true,
                message: "Pump listing",
                payload: {
                    pumps,
                    count,
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

module.exports = list;
