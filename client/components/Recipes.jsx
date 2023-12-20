import React, {useState, useEffect} from 'react'
import RecipeCard from "./RecipeCard.jsx";
import { v4 as uuidv4 } from 'uuid';


const Recipes = () => {
    const [recipes, setRecipes] = useState("")
    const [showRecipes, setShowRecipes] = useState(false);

    //useEffect to change DOM
    useEffect(()=> {
        const getRecipeData = async () => {
            try {
                const response = await fetch('/db'); 
                const recipes = await response.json();
                console.log('Received data:', recipes);
                setRecipes(recipes)
            } catch (error) {
                console.error('Error in front-end:', error.message);
            }
        }
        getRecipeData()
    }, [])
  
    if (!recipes) {
      return <h1>Add a Recipe!</h1>;
    }
  
    const toggleShowRecipes = () => {
      setShowRecipes(!showRecipes);
    };
  
    const displayRecipes = showRecipes
      ? recipes.map((data) => (
          <RecipeCard key={uuidv4()} recipeData={data} />
        ))
      : null;

    return (
        <div className = 'recipeContainer'>
          {displayRecipes}
          <button onClick={toggleShowRecipes}>
          {showRecipes ? 'Hide Recipes' : 'Show Current Recipes'}
          </button>
        </div>
      
    )
}

export default Recipes