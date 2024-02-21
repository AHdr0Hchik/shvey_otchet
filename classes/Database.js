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
          if (fs.existsSync(`./public/json/${filename}.json`)) {
            fs.truncate(`./public/json/${filename}.json`,0, function(err) {
              if(err) console.log('error', err);
              fs.writeFile(`./public/json/${filename}.json`, resultsJSON, function(err, result) {
                if(err) console.log('error', err);
              });
            });
          } else {
            fs.writeFile(`./public/json/${filename}.json`, resultsJSON, function(err, result) {
              if(err) console.log('error', err);
            });
          }   
    }
}
    


module.exports = Database;