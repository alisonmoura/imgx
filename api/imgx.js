var express = require('express');
var mysql = require('mysql');
var app = express();
var port = 3000;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alison',
  database: 'imgx'
});

connection.connect(function (err) {
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
  resp.send("Hello");
})

app.listen(port, function () {
  console.log(`IMGX listening on port ${port}`);
});