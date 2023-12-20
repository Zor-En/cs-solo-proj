const models = require('../models/projectModels.js')

const recipeControllers = {}

recipeControllers.getRecipes = async (req, res, next) => {
    const id = req.query.id
    console.log(id)
        try {
            const recipe = await models.Recipe.find({id})
            res.locals.getRecipes = recipe
            console.log('Data Received Successfully!')
            return next()
        } catch (error) {
            console.error('Error in getRecipes middleware:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
    }
}

recipeControllers.createRecipe = async (req, res, next) => {
const {image, name, ingredients, directions, calories, protein, carbohydrates, fat} = req.body
console.log('recieved body:', req.body)
    try {
        const newRecipe = await models.Recipe.create({image, name, ingredients, directions, calories, protein, carbohydrates, fat})
        res.locals.newRecipe = newRecipe
        console.log('Data Sent Successfully!')
        return next()
    } catch (error) {
        console.error('Error in createRecipe middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = recipeControllers;

