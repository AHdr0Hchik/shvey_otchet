const Database = require('./Database');

class DayStats {
    constructor(date, workersArr, idIzdely, proizved) {
        this.date = date,
        this.workersArr = workersArr,
        this.proizved = proizved;
        this.idIzdely = idIzdely
    }

    async Date(date) {
        if(date == null) console.log(this.date);
        else this.date = date;
    }
    async WorkersArr(workersArr) {
        if(workersArr == null) console.log(this.workersArr);
        else this.workersArr = workersArr;
    }
    async Proizved(proizved) {
        if(proizved == null) console.log(this.proizved);
        else this.proizved = proizved;
    }
    async IdIzdely(idIzdely) {
        if(idIzdely == null) console.log(this.idIzdely);
        else this.idIzdely = idIzdely;
    }

    
    async generateDayStat() {
        const db = new Database();
        let sum = 0;
        let studentsCount = 0
        const averageProizv = this.proizved/this.workersArr.length;
        //Первый просчёт для всех
        for(let i=0; i<this.workersArr.length; i++ ) {
            this.workersArr[i].proizved = averageProizv * this.workersArr[i].coef / 100;
            sum += this.workersArr[i].proizved;
            if(this.workersArr[i].coef < 100) studentsCount += 1;
            this.workersArr[i].proizved = this.workersArr[i].proizved;
        }

        //Второй просчёт, исключая стажёров
        const ostatok = this.proizved - sum;
        const averageOstatok = ostatok/(this.workersArr.length-studentsCount);
        for(let i=0; i<this.workersArr.length; i++ ) {
            if(this.workersArr[i].coef < 100) {
                continue;
            } else {
                this.workersArr[i].proizved += averageOstatok;
                this.workersArr[i].proizved = this.workersArr[i].proizved.toFixed(4);
                
            }
        }

        //Формирование массива для History
        var workersArrMin = [];
        for(let i=0; i<this.workersArr.length; i++) {
            workersArrMin[i]={"id": this.workersArr[i].id, "proizved":this.workersArr[i].proizved};
        }
        const workersArrJSON = JSON.stringify(workersArrMin);
        db.doQuery(`INSERT INTO history (date, arrWorkers, proizved) values ("${this.date}", '${workersArrJSON}', ${this.proizved});`);
        
    }
}
module.exports = DayStats;

