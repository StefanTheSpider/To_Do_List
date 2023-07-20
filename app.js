const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getDate = require('./date');
const date = require(__dirname + '/date.js');
const _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
require("dotenv").config();

//mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pe8hbzv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
client.connect();





  const dbName = "logbuch";
  const collectionName = "item";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

//*! Hauptteil */ 


app.get('/', async function(req, res) {
  let day = date.getDate();
  try {
    const result = await collection.find({}).toArray();
    console.log(result);
    res.render('list.ejs', { ListTitle: day, newListItems: result });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error occurred');
  }
});


app.post('/', function(req, res) {
  const itemName = req.body.newItem;
  let day = date.getDate();
  const item = {
    name: itemName
  }
    collection.insertOne(item)
    console.log(itemName);
    res.redirect('/')
  })

// ... (your previous code)

app.post("/delete", async function(req, res) {
  try {
    const checkedItemId = req.body.checkbox;

    // Use MongoDB's ObjectId to convert the ID string to an ObjectId
    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(checkedItemId);

    // Delete the item by ID
    const deleteResult = await collection.deleteOne({ _id: objectId });
    
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred");
  }
});

// ... (your previous code)





client.close();
app.listen(3500, () => console.log('Server is runing on port 3500'));