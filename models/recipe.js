const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingSchema = new Schema({
    name: String,
    amount:Number
   
});
const RecipeSchema = new Schema({
    name: String,
    desc: String,
    imgPath: String,
    ingridents:[ShoppingSchema]
});

module.exports = mongoose.model('RecipeBox', RecipeSchema);

