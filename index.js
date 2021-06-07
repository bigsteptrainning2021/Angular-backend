const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const ShoppingList=require('./models/shopping-list');
const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(cors())

mongoose.connect('mongodb+srv://mj:mj12345@cluster0.wfmad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.post('/newShopping',async(req,res)=>{
    const shopping=new ShoppingList(req.body);
    await shopping.save();
    res.send(true);

})
app.post('/editShopping',async(req,res)=>{
    const shopping=await ShoppingList.findByIdAndUpdate(req.body.id,req.body.data);
    await shopping.save();
    res.send(true);

})

app.get('/getShopping',async(req,res)=>{
    const shopping=await ShoppingList.find({})
    res.send(shopping);

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});