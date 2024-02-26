const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const Database = require("./classes/Database");
const DayStats = require("./classes/DayStats");
const Student = require("./classes/Student");
const Worker = require("./classes/Worker");
const fs = require('fs');
const ExcelExporter = require('./classes/ExcelExporter');


const db = new Database();
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
}));
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use('/libs',express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/css'));

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




const createPath = (page) => path.resolve(__dirname, 'public', `${page}.ejs`);

app.listen(PORT,() => {
   console.log(`Listening port ${PORT}`);
});



app.get('/', async (req, res) => {
    res.render(createPath('index'));
    await db.getTableDataJSON('workers', 'workers');
})

app.post('/dataHandler', async function (req, res) {
   let dayStatsArr = [];
   for(let i = 0; i<req.body.length; i++) {
      console.log(req.body);
      const dayStat = new DayStats(req.body[i][0].value);
      let workers = [];

      dayStat.IdIzdely(1);
      dayStat.Proizved(parseInt(req.body[i][0].proizved));
      
      for(let j = 1; j<req.body[i].length; j++) {
         workers.push({"name" : req.body[i][j].value, "coef": req.body[i][j].coef, "id": req.body[i][j].id})
      }
      dayStat.WorkersArr(workers);
      dayStat.generateDayStat();

      dayStatsArr.push(dayStat);
   }
   const dayStatJSON = JSON.stringify(dayStatsArr);
   await DayStatsJSON('history', dayStatJSON);
 });

 async function DayStatsJSON(filename, resultsJSON) {
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

app.post('/addWorker', async function (req, res) {
   var nWorker = new Student();
   nWorker.Name(req.body.name);
   nWorker.Coef(req.body.coef);
   nWorker.addStudentToDB();
   res.redirect("/");
});
app.post('/removeWorker', async function (req, res) {
   var nWorker = new Worker();
   await nWorker.Id(req.body.id);
   await nWorker.removeWorkerFromDB();
   res.redirect("/");
});
app.post('/excelExport', async function (req, res) {
   var Excel = new ExcelExporter;
   console.log(req.body);
   //console.log(req.body[0][Object.keys(req.body[0])[0]]);
   await Excel.createWorksheet(`Журнал за ${req.body[2][0]}-${req.body[req.body.length-1][0]}`,req.body.length, 50, req.body);
});