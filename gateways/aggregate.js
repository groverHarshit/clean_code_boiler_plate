class aggregate {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(aggregate.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const count = await this.model.aggregate(filter);
                filter.pop();

                const payload = await this.model.aggregate(filter)
                resolve({ payload, count: count.length == 1 ? count[0].count : 0 })
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = aggregate;