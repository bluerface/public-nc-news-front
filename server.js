var express = require('express');
var app = express();
var PORT = process.env.PORT;

app.use(express.static('public'))

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`)
})
