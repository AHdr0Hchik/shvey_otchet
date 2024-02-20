const Database = require('./Database');

class Worker {
    constructor(name) {
        this.name = name
    }
    async Name(name) {
        if(name == null) console.log(this.name);
        else this.name = name;
    }
    
    async addWorkerToDB() {
        const db = new Database();
        await db.doQuery(`insert into workers (name, coef) values ("${this.name}", 100)`);
    }

}
module.exports = Worker;