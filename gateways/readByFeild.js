class getByFeild {
    constructor(model) {
        this.model = model;
        for(let i of Object.getOwnPropertyNames(getByFeild.prototype)){
            if (i!=='constructor'){
                this[i] = this[i].bind(this);
            }
        }
    }

    async execute(feild, value) {
        return new Promise(async (resolve, reject) => {
            try {
                const findObj = {}
                findObj[feild] = value;

                resolve(await this.model.find(findObj));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = getByFeild;
