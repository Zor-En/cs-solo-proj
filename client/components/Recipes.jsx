import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard.jsx";
import { v4 as uuidv4 } from "uuid";
import CreateRecipe from "./CreateRecipe.jsx";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [getRecipe] = useState(true);
  const [deletedRecipe, setDeletedRecipe] = useState(false)

  //handles getting recipes
  const getRecipeData = async () => {
    try {
      const response = await fetch("/db");
      const recipes = await response.json();
      console.log("Received data:", recipes);
      setRecipes(recipes);
    } catch (error) {
      console.error("Error in front-end:", error.message);
    }
  };
  useEffect(() => { //useEffect since dom is being manipulated
    if (getRecipe) {
      getRecipeData();
    }
  }, [getRecipe]);


 //handles deleting recipes
  const deleteRecipeData = async (_id) => {
    try {
      const response = await fetch('/db/' + _id, {
        method: 'DELETE'
      })
      console.log('Successfully Deleted!')
      setDeletedRecipe(true)
    } catch (error) {
      console.error("Error in front-end:", error.message);
    }
  }
  useEffect(() => {
    if (deletedRecipe) {
         //need to reset state!
      setDeletedRecipe(false); 
         //need to perform another get request to re-render page!!!
      getRecipeData()
    }
  }, [deletedRecipe]);

//display recipes
const displayRecipes = recipes.reverse().map((data) => <RecipeCard key={uuidv4()} recipeData={data} getRecipeData={getRecipeData} deleteRecipeData={deleteRecipeData}/>)
  
  return (
    <div id='main-container'>
         <CreateRecipe />
      <div className="recipe-container">{displayRecipes}</div>
    </div>
  );
};

export default Recipes;
