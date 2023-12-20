import React from 'react'


const RecipeCard = ({recipeData}) => {
    const {image, name, ingredients, directions, calories, protein, carbohydrates, fat} = recipeData

    return (
        <div className='recipe-card'>
          {image && <img className='recipe-img' src={image}/>}
          <ul>
          <p>Name: {name}</p>
          <p>Ingredients: {ingredients}</p>
          <p>Directions: {directions}</p>
          <p>Calories: {calories}</p>
          <p>Protein: {protein}</p>
          <p>Carbohydrates: {carbohydrates}</p>
          <p>Fat: {fat}</p>
          </ul>
        </div>
    )
}

export default RecipeCard