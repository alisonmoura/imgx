var express = require('express');
var app = express();
var port = 3000;

app.get("/", function(req, resp){
    resp.send("Hello");
})

app.listen(port, function () {
  console.log(`IMGX listening on port ${port}`);
});