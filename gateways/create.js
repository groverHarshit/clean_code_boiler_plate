class create {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(create.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(data) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.create(data);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = create;