const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getDate = require('./date');
// Ruft das modul in der 'date.js' Datei auf
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema ({
  name: String
});

const Item = mongoose.model('Item', itemsSchema, 'item');

const addedItems = [];

async function itemsCall() {
  try {
    const items = await Item.find();
    items.forEach((item) => {
      addedItems.push(item);
    })
  } catch (error) {
    console.log(error);
  }
};

async function itemsDelete() {
  try {
    const items = await Item.findOneAndDelete();
    items.forEach((item) => {
      addedItems.push(item.name);
    })
  } catch (error) {
    console.log(error);
  }
};

app.get('/', function(req, res) {
  // wir nuzen die Funktion aus der 'date.js' Datei
  let day = date.getDate();
  // hier erzeugen wir die Variablen, die wir dann ins HTML der entsprechenden Datei injezieren
  res.render('list.ejs', {ListTitle: day, newListItems: addedItems});
});

app.post('/', function(req, res) {
  const itemName = req.body.newItem;

  const item = new Item ({
    name: itemName
  })
   item.save();
   addedItems.push(item.name)
   res.redirect('/');
  })
  itemsCall();
  
  app.post('/delete', (req, res) => {
    const checkedItem = req.body.checkbox;
    console.log(checkedItem);
    //res.redirect('/');
  });

/*
const coocking = new Item ({
  neme: 'coocking'
});
const gaming = new Item ({
  name: 'gaming'
});
const reading = new Item ({
  name: 'reading'
});
async function insert() {
  try {
    Item.insertMany([coocking, gaming, reading])
  } catch (error) {
    console.log(error);
  }
};

insert()
*/


/*
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
*/


app.listen(3000, () => console.log('Server is runing on port 3000'));