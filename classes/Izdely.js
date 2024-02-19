const Database = require('./Database');

class Izdely {

    constructor(name) {
        this.name = name
    }

    async Name(name) {
        if(name == null) console.log(this.name);
        else this.name = name;
    }
    
    async addIzdelyToDB() {
        const db = new Database();
        await db.doQuery(`insert into izdely (name) values ("${this.name}")`);
    }

}
module.exports = Izdely;