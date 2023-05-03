const express = require('express');
const bodyParser = require('body-parser');
const getDate = require('./date');
// Ruft das modul in der 'date.js' Datei auf
const date = require(__dirname + '/date.js')

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', function(req, res) {
  // wir nuzen die Funktion aus der 'date.js' Datei
  let day = date.getDate();
  res.render('list.ejs', {ListTitle: day, newListItems: items});
});

const workItems = [];
const items = [];
app.post('/', function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === 'Work') {
    workItems.push(item);
  res.redirect('/work')
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', function(req, res) {
  res.render('list.ejs', {ListTitle: 'Work List', newListItems: workItems});
});

app.listen(3000, () => console.log('Server is runing on port 3000'));