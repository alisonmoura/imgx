var express = require('express');
var mysql = require('mysql');
var app = express();
var port = 3000;

var pool = mysql.createPool({
  connectionLimit: 100, //important
  host: 'localhost',
  user: 'root',
  password: 'alison',
  database: 'imgx',
  debug: false
});

pool.getConnection(function (err, connection) {
  if (!err) {
    console.log("Database is connected ...");
    var query = "CREATE TABLE IF NOT EXISTS user (id int NOT NULL, name varchar(100) NOT NULL, email varchar(100) NOT NULL, password varchar(100) NOT NULL, PRIMARY KEY(id))";
    connection.query(query, function (err, rows, fields) {
      if (err)
        console.log(`Error: ${JSON.stringify(err)}`);
      else console.log("Table user was created");
    });
  } else {
    console.log("Error connecting database ..." + JSON.stringify(err));
  }
});

app.get("/", function (req, resp) {
  var query = "SELECT * FROM user"
  pool.getConnection(function (err, connection) {
    if (!err) {
      connection.query(query, function (err, rows, fields) {
        if (!err) {
          resp.json(rows);
        } else console.log(JSON.stringify(err));
      })
    }
  })
});

app.listen(port, function () {
  console.log(`IMGX listening on port ${port}`);
});