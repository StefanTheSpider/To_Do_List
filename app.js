const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getDate = require('./date');
const date = require(__dirname + '/date.js');
const _ = require('lodash')
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema ({
  name: String
});

const listsSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema] 
})

const Item = mongoose.model('Item', itemsSchema, 'item');

const Lists = mongoose.model('Lists', listsSchema, 'lists');

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
  let day = date.getDate();
  const listName = req.body.list;
  const item = new Item ({
    name: itemName
  });
  if (listName === day) {
    item.save();
    res.redirect('/');
  } else {
    Lists.findOne({name: listName})
    .then(find => {
      find.items.push(item);
      find.save();
      res.redirect('/' + listName);
    })
    .catch(err => {
      console.log(err);
    });
    } 
  })

  
  app.post("/delete", async function(req, res) {
    let day = date.getDate();
    const listName = req.body.listName;
    const checkedItemId = req.body.checkbox;
  
    if (listName === day) {
      try {
        if (checkedItemId !== undefined) {
          await Item.findByIdAndRemove(checkedItemId);
          setTimeout(() => {
            res.redirect('/');
          }, 150);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const list = await Lists.findOne({ name: listName });
        if (list) {
          // Find the index of the item to be removed
          const itemIndex = list.items.findIndex(item => item._id.toString() === checkedItemId);
          if (itemIndex !== -1) {
            // Remove the item from the array
            list.items.splice(itemIndex, 1);
            // Save the updated list
            await list.save();
          }
          setTimeout(() => {
            res.redirect('/' + listName);
          }, 150);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  

app.get('/:customName', async (req, res) => {
  const pramsName = _.capitalize(req.params.customName) 
  Lists.findOne({name: pramsName})
  .then (foundList => {
    if(!foundList) {
      const list = new Lists ({
        name: pramsName,
        items: []
      });
      list.save();
      res.redirect('/' + pramsName);
    } else {
      res.render('list', {ListTitle: foundList.name, newListItems: foundList.items});
    }
  })
  .catch(err => {
    console.log(err);
  });
});



app.listen(3000, () => console.log('Server is runing on port 3000'));