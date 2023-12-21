import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard.jsx";
import { v4 as uuidv4 } from "uuid";
import CreateRecipe from "./CreateRecipe.jsx";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [createRecipe, setCreateRecipe] = useState(true);
  const [deletedRecipe, setDeletedRecipe] = useState(false)
  const [updatedRecipe, setUpdatedRecipe] = useState(false)
  
  //handles getting recipes
  const getRecipeData = async () => {
    try {
      const response = await fetch("/db");
      const recipes = await response.json();
      console.log("Received data:", recipes);
      if (response.ok) {
        setRecipes(recipes);
      }
    } catch (error) {
      console.error("Error in front-end:", error.message);
    }
  };
  useEffect(() => {
    if (createRecipe) {
      getRecipeData();
    }
  }, [createRecipe]);


 //handles deleting recipes
  const deleteRecipe = async (id) => {
    try {
      const response = await fetch('/db/' + id, {
        method: 'DELETE'
      })
      if (response.ok) {
        console.log('Successfully Deleted!')
        setDeletedRecipe(true)
      }
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


//handles updating recipes  
const updateRecipe = async (id) => {
  try {
    const response = await fetch('/db/' + id, {
      method: 'PATCH'
    })
    if (response.ok) {
      console.log('Successfully Updated!')
      setUpdatedRecipe(true)
    }
  } catch (error) {
    console.error("Error in front-end:", error.message);
  }
}
useEffect(() => {
  if (updatedRecipe) {
       //need to reset state!
    setUpdatedRecipe(false); 
       //need to perform another get request to re-render page!!!
    getRecipeData()
  }
}, [updatedRecipe]);


//display recipes
const displayRecipes = recipes.reverse().map((data) => <RecipeCard key={uuidv4()} recipeData={data} deleteData={deleteRecipe} updateData={updateRecipe}/>)
  
  return (
    <div id='main-container'>
         <CreateRecipe />
      <div className="recipe-container">{displayRecipes}</div>
   
    </div>
  );
};

export default Recipes;
