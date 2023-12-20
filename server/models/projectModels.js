const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://zorenzal:6M3wdlj2qS8ObOrp@cluster0.lrqzw8z.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI)
  const db = mongoose.connection
  db.on('error', (error)=>console.log(error))
  db.once('open', ()=>console.log('connected to db'))

const Schema = mongoose.Schema; 

const recipeSchema = new mongoose.Schema({
    image: String,
    name: String,
    ingredients: [String],
    directions: String,
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
  });

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = {Recipe}
