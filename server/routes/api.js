const express = require('express')
const recipeController = require('../controllers/recipeControllers')
const router = express.Router()

router.get('/db', recipeController.getRecipes, (req,res)=>res.status(200).json(res.locals.getRecipes))

router.post('/create', recipeController.createRecipe, (req,res)=> res.status(200).json(res.locals.newRecipe))

router.delete('/db/:id', recipeController.deleteRecipe, (req,res)=> res.status(200).json(res.locals.deleteRecipe))

router.patch('/db/:id', recipeController.updateRecipe, (req,res)=> res.status(200).json(res.locals.updatedRecipe))

module.exports = router;