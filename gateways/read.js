class get {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(get.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.model.findById(id))
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = get;
