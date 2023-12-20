const express = require('express')
const recipeController = require('../controllers/recipeControllers')
const router = express.Router()

router.get('/db', recipeController.getRecipes, (req,res)=>res.status(200).json(res.locals.getRecipes))

router.post('/create', recipeController.createRecipe, (req,res)=> res.status(200).json(res.locals.newRecipe))



module.exports = router;