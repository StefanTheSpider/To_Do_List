const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

/* app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
}); */

app.get('/', function(req, res) {
  let today = new Date();
  let currentDay = { weekday: 'long' }
  let day = today.toLocaleDateString('de-DE', currentDay);

  res.render('list.ejs', {kindOfDay: day});
});


app.listen(3000, () => console.log('Server is runing on port 3000'));