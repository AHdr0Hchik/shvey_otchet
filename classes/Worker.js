const Database = require('./Database');

class Worker {

    constructor(name, coef) {
        this.name = name,
        this.coef = coef
    }
    async name(name) {
        if(name == null) console.log(this.name);
        else this.name = name;
    }
    async coef(coef) {
        if(coef == null) console.log(this.coef);
        else this.coef = coef;
    }
    
    async addWorkerToDB() {
        const db = new Database();
        await db.doQuery(`insert into workers (name, coef) values ("${this.name}", "${this.coef}")`);
    }

}
module.exports = Worker;