class list {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(list.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const skip = filter.skip;
                const limit = filter.limit;
                const sort = filter.sort;

                delete filter.skip;
                delete filter.sort;
                delete filter.limit;

                const payload = await this.model.find(filter).skip(skip).limit(limit).sort(sort);
                const count = await this.model.countDocuments(filter);

                resolve({ payload, count })
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = list;
