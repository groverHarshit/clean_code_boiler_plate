class update {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(update.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.findByIdAndUpdate(id, data);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = update;
