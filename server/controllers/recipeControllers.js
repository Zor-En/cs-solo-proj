const models = require('../models/projectModels.js')

const recipeControllers = {}

recipeControllers.getRecipes = async (req, res, next) => {
        try {
            const recipe = await models.Recipe.find({})
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
console.log('received body:', req.body)
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

recipeControllers.deleteRecipe = async (req,res,next) =>{
    const id = req.params.id
    try {
        const deleteRecipe = await models.Recipe.deleteOne({_id: id})
        res.locals.deleteRecipe = deleteRecipe
        console.log('Data Deleted Successfully!')
        return next()
    } catch (error) {
        console.error('Error in getRecipes middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}   

recipeControllers.updateRecipe = async (req,res,next) => {
    const updates = req.body
    const id = req.params.id
    try {
        const updateRecipe = await models.Recipe.updateOne({_id: id}, updates)
        res.locals.updatedRecipe = updateRecipe
        console.log('Data Updated Successfully!:', updateRecipe)
        return next()
    } catch (error) {
        console.error('Error in updateRecipes middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = recipeControllers;

