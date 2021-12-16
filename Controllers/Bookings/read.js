class get {
    constructor(useCases) {
        this.bookingsUseCase = useCases.bookingsUseCase
        for (let i of Object.getOwnPropertyNames(get.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const booking = await this.bookingsUseCase.read(req.params.id, req.user);
            return res.status(200).json({
                success: true,
                message: "User.",
                payload: {
                    booking
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
