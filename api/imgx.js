var express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
var userRouter = require('./routes/UserRouter');
var loginRouter = require('./routes/LoginRouter');

var app = express();
var port = 3000;

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'alison',
  database: 'imgx',
  debug: false
});

app.locals.poolConnection = pool;
app.locals.sendError = function (err) {
  console.log(err);
  app.locals.response.json(501);
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRouter(app);
loginRouter(app);

pool.getConnection(function (err, connection) {
  if (!err) {
    console.log("Database is connected ...");
    var query = "CREATE TABLE IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, email varchar(100) NOT NULL, password varchar(100) NOT NULL, PRIMARY KEY(id))";
    connection.query(query, function (err, rows, fields) {
      if (err)
        console.log(`Error: ${JSON.stringify(err)}`);
      else console.log("Table user was created");
    });
  } else {
    console.log("Error connecting database ..." + JSON.stringify(err));
  }
});

app.listen(port, function () {
  console.log(`IMGX listening on port ${port}`);
});