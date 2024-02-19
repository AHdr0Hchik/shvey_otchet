const Database = require('./Database');

class DayStats {
    constructor(date, workersArr, idIzdely) {
        this.date = date,
        this.workersArr = workersArr,
        this.proizved = 0;
        this.idIzdely = idIzdely,
        this.dayStat = []
    }

    async date(date) {
        if(date == null) console.log(this.date);
        else this.date = date;
    }
    async workersArr(workersArr) {
        if(workersArr == null) console.log(this.workersArr);
        else this.workersArr = workersArr;
    }
    async proizved(proizved) {
        if(proizved == null) console.log(this.proizved);
        else this.proizved = proizved;
    }
    async idIzdely(idIzdely) {
        if(idIzdely == null) console.log(this.idIzdely);
        else this.idIzdely = idIzdely;
    }

    
    async generateDayStat() {
        const db = new Database();

        await db.doQuery();
    }

}
module.exports = DayStats;

