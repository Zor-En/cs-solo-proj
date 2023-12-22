import React, {useState, useEffect} from 'react'


const RecipeCard = ({recipeData, deleteRecipeData, getRecipeData}) => {
  //og data from db
    const {_id, image, name, ingredients, directions, calories, protein, carbohydrates, fat} = recipeData

    const [updatedName, setUpdatedName] = useState(name);
    const [updatedIngredients, setUpdatedIngredients] = useState(ingredients);
    const [updatedDirections, setUpdatedDirections] = useState(directions);
    const [updatedCalories, setUpdatedCalories] = useState(calories);
    const [updatedProtein, setUpdatedProtein] = useState(protein);
    const [updatedCarbohydrates, setUpdatedCarbohydrates] = useState(carbohydrates);
    const [updatedFat, setUpdatedFat] = useState(fat);
  
    const [updatedRecipe, setUpdatedRecipe] = useState(false)


    const updateRecipe = async (_id) => {
      const updatedValues = {
        name: updatedName, 
        ingredients: updatedIngredients, 
        directions: updatedDirections, 
        calories: updatedCalories, 
        protein: updatedProtein, 
        carbohydrates: updatedCarbohydrates, 
        fat: updatedFat
      }
      console.log("UPDATED VALUES", updatedValues);
       try {
        const response = await fetch('/db/' + _id, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues)
        })
        console.log('Successfully Updated!')
        console.log("RESPONSE BODY", response.body)
        //rerender page by getting new data from db
        getRecipeData()
      } catch (error) {
        console.error("Error in front-end:", error.message);
      }
    }
    
    console.log(updatedName)
    return (
        <div className='recipe-card'>
          {image && <img className='recipe-img' src={image}/>}
          <ul>
          <h2>{updatedRecipe ? <input value={updatedName} onChange={(e)=>setUpdatedName(e.target.value)}></input> : name}</h2>
          <label>Ingredients:  {updatedRecipe ? <input value={updatedIngredients} onChange={(e)=>setUpdatedIngredients(e.target.value)}></input> : ingredients}</label>
          <label>Directions:  {updatedRecipe ? <input value={updatedDirections} onChange={(e)=>setUpdatedDirections(e.target.value)}></input> : directions}</label>
          <label>Calories: {updatedRecipe ? <input value={updatedCalories} onChange={(e)=>setUpdatedCalories(e.target.value)} type='number'></input> : calories}kcal</label>
          <label>Protein:  {updatedRecipe ? <input value={updatedProtein} onChange={(e)=>setUpdatedProtein(e.target.value)} type='number'></input> : protein}g</label>
          <label>Carbohydrates: {updatedRecipe ? <input value={updatedCarbohydrates} onChange={(e)=>setUpdatedCarbohydrates(e.target.value)}  type='number'></input> : carbohydrates}g</label>          
          <label>Fat: {updatedRecipe ? <input value={updatedFat} onChange={(e)=>setUpdatedFat(e.target.value)} type='number'></input> : fat}g</label>
            <div>
              <button onClick={()=> (updatedRecipe ? updateRecipe(_id) : setUpdatedRecipe(true))}>{updatedRecipe ? 'Submit' : 'Update'}</button>
              <button onClick={()=>deleteRecipeData(_id)}>Delete</button>
            </div>
          </ul>
        </div>
    )
}

export default RecipeCard