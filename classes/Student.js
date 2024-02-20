class Student extends Worker {
    constructor() {
        this.coef;
    }
    db = new Database();

    async Coef(coef) {
        if(coef == null) console.log(this.coef);
        else this.coef = coef;
    }

    async addStudentToDB() {
        await db.doQuery(`insert into workers (name, coef) values ("${this.name}", ${this.coef})`);
    }
    
    async updateCoef() {
        await db.doQuery(`update workers set coef=${this.coef} where name=${this.name}`);
    }
}