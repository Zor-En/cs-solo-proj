const express = require('express')
const path = require('path');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initial db model
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://zorenzal:6M3wdlj2qS8ObOrp@cluster0.lrqzw8z.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI)
  const db = mongoose.connection
  db.on('error', (error)=>console.log(error))
  db.once('open', ()=>console.log('connected to db'))

  const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    directions: String,
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
  });

const Recipe = mongoose.model('recipe', recipeSchema)

//initial controllers
const recipeControllers = {}
recipeControllers.createRecipe = async (req, res, next) => {
const {name, ingredients, directions, calories, protein, carbohydrates, fat} = req.body
console.log('recieved body:', req.body)
    try {
        const newRecipe = await Recipe.create({name, ingredients, directions, calories, protein, carbohydrates, fat})
        console.log(newRecipe)
        res.locals.newRecipe = newRecipe
        return next()
    } catch (error) {
        console.error('Error in createRecipe middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const router = express.Router()
const createRouter = router.post('/', recipeControllers.createRecipe, (req,res)=> res.status(200).json(res.locals.newRecipe))

//route handler
if (process.env.NODE_ENV === 'production') {
 app.use('/build', express.static(path.join(__dirname, '../build')))
}

app.use('/', createRouter)



app.listen(3000, ()=>{console.log(`listening port 3000`)})
module.exports = app