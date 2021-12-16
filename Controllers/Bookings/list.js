class list {
    constructor(useCases) {
        this.bookingsUseCase = useCases.bookingsUseCase
        for (let i of Object.getOwnPropertyNames(list.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const { bookingListing, count } = await this.bookingsUseCase.list({ ...req.query });
            return res.status(200).json({
                success: true,
                message: "Booking listing",
                payload: {
                    bookingListing,
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
