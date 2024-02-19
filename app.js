const Worker = require('./classes/Worker');
const Izdely = require('./classes/Izdely');
const Database = require('./classes/Database');
const DayStats = require('./classes/DayStats');



async function main() {
    const db = new Database();
    const worker = new Worker("Вася Пупкин", "100");
    const izdely = new Izdely('Шуба норковая');
    const dayStats = new DayStats();


    try {
        const workers = db.doQuery('select id, name, coef from workers');
        worker.Coef();
        

        //await worker.addWorkerToDB();
        //await izdely.addIzdelyToDB();

    } catch(error) {
        console.error(error)
    } finally {
        return 0;
    }

}
main();