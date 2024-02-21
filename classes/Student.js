const Worker = require("./Worker");
const Database = require('./Database');

class Student extends Worker {
    constructor(name, coef) {
        super(name),
        this.coef = coef
    }
    db = new Database();

    async Coef(coef) {
        if(coef == null) console.log(this.coef);
        else this.coef = coef;
    }

    async addStudentToDB() {
        await this.db.doQuery(`insert into workers (name, coef) values ("${this.name}", ${this.coef})`);
    }
    
    async updateCoef() {
        await this.db.doQuery(`update workers set coef=${this.coef} where name=${this.name}`);
    }
}
module.exports=Student;