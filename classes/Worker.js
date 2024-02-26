const Database = require('./Database');

class Worker {
    constructor(name, id, countWDays) {
        this.id = id,
        this.name = name,
        this.countWDays = countWDays
    }
    async Name(name) {
        if(!name) console.log(this.name);
        else this.name = name;
    }
    async Id(id) {
        if(!id) console.log(this.id);
        else this.id = id;
    }
    async CountWDays(countWDays) {
        if(!countWDays) console.log(this.countWDays);
        else this.countWDays = countWDays;
    }
    
    async addWorkerToDB() {
        const db = new Database();
        await db.doQuery(`insert into workers (name, coef) values ("${this.name}", 100)`);
    }
    async removeWorkerFromDB() {
        const db = new Database();
        await db.doQuery(`DELETE FROM workers WHERE id="${this.id}"`);
        await db.doQuery(`ALTER TABLE workers AUTO_INCREMENT=${this.id}`);
        console.log(this.name);
    }

}
module.exports = Worker;