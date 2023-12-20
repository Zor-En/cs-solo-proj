import React from 'react'
import CreateRecipe from './CreateRecipe.jsx'
import Recipes from './Recipes.jsx'
import '../index.scss'


const App = () => {
    return (
        <div>
            <Recipes/>
            <CreateRecipe/>
        </div>
    )
}

export default App