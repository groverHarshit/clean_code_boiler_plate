class deleteByFeild {
    constructor(model) {
        this.model = model;
        for (let i of Object.getOwnPropertyNames(deleteByFeild.prototype)) {
            if (i !== 'constructor') {
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(feild, value) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteObject = {};
                deleteObject[feild] = value;

                await this.model.deleteMany(deleteObject);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = deleteByFeild;