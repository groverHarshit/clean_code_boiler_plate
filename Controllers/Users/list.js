class list {
    constructor(useCases) {
        this.userUseCase = useCases.userUseCase
        for (let i of Object.getOwnPropertyNames(list.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(req, res) {
        try {
            const { userList, count } = await this.userUseCase.list({ ...req.query });
            return res.status(200).json({
                success: true,
                message: "User listing",
                payload: {
                    userList,
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
