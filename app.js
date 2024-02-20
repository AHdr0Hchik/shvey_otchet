const express = require('express');
const path = require('path');
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const Database = require("./classes/Database");
const { workers } = require('cluster');


const db = new Database();
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
}));
app.set('view engine', 'ejs')

const PORT = 4000;

/*http.createServer(function (req, res){
   const url = req.url;
   console.log(url);

   switch (url) {
      case('/'):
         app.get('/', (req, res) => {
            res.render(createPath('index'));
         });
      default:
         res.statusCode = 404;
         console.log('404');
   }


}).listen(PORT, HOSTNAME);*/



/*
const connection = mysql.createConnection({
   host: "127.0.0.1",
   port: "3306",
   user: "sqluser",
   database: "cherrymenu",
   password: "password"
});
 */




const createPath = (page) => path.resolve(__dirname, 'public/ejs', `${page}.ejs`);

app.listen(PORT,() => {
   console.log(`Listening port ${PORT}`);
});



app.get('/', async (req, res) => {
    res.render(createPath('index'));
    await db.getTableDataJSON('workers', 'workers');
})



