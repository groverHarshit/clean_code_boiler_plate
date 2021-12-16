class Delete {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(Delete.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.findByIdAndDelete(id);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Delete;