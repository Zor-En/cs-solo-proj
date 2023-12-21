import React from 'react'


const RecipeCard = ({recipeData, deleteData, updateData}) => {
    const {_id, image, name, ingredients, directions, calories, protein, carbohydrates, fat} = recipeData
 


    return (
        <div className='recipe-card'>
          {image && <img className='recipe-img' src={image}/>}
          <ul>
          <h2>{name}</h2>
          <p>Ingredients: {ingredients}</p>
          <p>Directions: {directions}</p>
          <p>Calories: {calories}</p>
          <p>Protein: {protein}</p>
          <p>Carbohydrates: {carbohydrates}</p>
          <p>Fat: {fat}</p>

          <button onClick={()=>updateData(_id)}>Update</button>

          <button onClick={()=>deleteData(_id)}>Delete</button>
          </ul>
         
        </div>
    )
}

export default RecipeCard