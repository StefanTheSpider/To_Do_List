const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getDate = require('./date');
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

//*! Hauptteil */  

app.get('/', async function(req, res) {
  let day = date.getDate();
  try {
    const items = await Item.find();
    res.render('list.ejs', {ListTitle: day, newListItems: items});
  } catch(err) {
    console.log(err);
  }
});

app.post('/', function(req, res) {
  const itemName = req.body.newItem;
  const item = new Item ({
    name: itemName
  })
   item.save();
   res.redirect('/');
  })

  
  app.post("/delete", async function(req, res){
    try {
      const checkedItemId = req.body.checkbox;
      console.log(checkedItemId);
      if(checkedItemId !== undefined){
        await Item.findByIdAndRemove(checkedItemId);
       setTimeout(() => {
        res.redirect('/');
      }, 150);
      }
    } catch (err) {
      console.log(err.message);
    }
  });
app.listen(3000, () => console.log('Server is runing on port 3000'));