const mysql = require('mysql2');
const fs = require('fs');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "shve",
        });
    }

    async doQuery(sql) {
        try {
          await this.connection.promise().query(sql)
            .then(([results]) => {
              this.results = results;
            });
        } catch (error) {
          console.log(error);
        }
      }

    async getTableDataJSON(table_name, filename){
          const [results] = await this.connection.promise().query(`select * from ${table_name}`);
          const resultsJSON = JSON.stringify(results);
          console.log(resultsJSON);
          fs.writeFile(`./public/json/${filename}.json`, resultsJSON, function(err, result) {
            if(err) console.log('error', err);
          });
    }
}
    


module.exports = Database;