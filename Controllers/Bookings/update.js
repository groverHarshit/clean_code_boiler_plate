class update {
    constructor(useCases) {
        this.bookingsUseCase = useCases.bookingsUseCase
        for (let i of Object.getOwnPropertyNames(update.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            await this.bookingsUseCase.update(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                message: "Booking is updated",
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

module.exports = update;
