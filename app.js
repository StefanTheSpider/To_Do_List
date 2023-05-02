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
  let currentDay = { weekday: 'long', day: 'numeric', month: 'long' }
  let day = today.toLocaleDateString('de-DE', currentDay);

  res.render('list.ejs', {ListTitle: day, newListItems: items});
});

let workItems = [];
let items = [];
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