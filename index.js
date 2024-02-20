const Worker = require('./classes/Worker');
const Izdely = require('./classes/Izdely');
const Database = require('./classes/Database');
const DayStats = require('./classes/DayStats');



async function main() {
    const db = new Database();
    const worker = new Worker("Вася Пупкин", "100");
    const izdely = new Izdely('Шуба норковая');


    try {
        const date = '2023-12-31';
        const id_izdely = 1;
        const proizved = 43;
        const sqlWorkers = 'select id, name, coef from workers';
        const [workers] = await db.connection.promise().query(sqlWorkers);
        const dayStats = new DayStats(date, workers, id_izdely, proizved);
        dayStats.generateDayStat();

        
        

        //await worker.addWorkerToDB();
        //await izdely.addIzdelyToDB();

    } catch(error) {
        console.error(error)
    } finally {
        return 0;
    }

}
main();