const mysql = require('mysql2');

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
              this.connection.end;
            });
        } catch (error) {
          console.log(error);
        }
      }
    
}

module.exports = Database;