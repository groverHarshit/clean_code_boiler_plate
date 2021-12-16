class Delete {
    constructor(useCases) {
        this.bookingsUseCase = useCases.bookingsUseCase
        for (let i of Object.getOwnPropertyNames(Delete.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            await this.bookingsUseCase.delete(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Booking is deleted",
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

module.exports = Delete;