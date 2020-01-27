const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

function redirectUnmatched(req, res) {
  res.redirect("https://jamielegg.com/gethub");
}

app.use(redirectUnmatched);
app.use(express.static(path.join(__dirname, 'build')));



app.get('/gethub', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 80);