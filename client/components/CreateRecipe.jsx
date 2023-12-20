import React, { useState, useEffect } from "react";


const useInput = start => {
  const [ value, setValue ] = useState(start);
  const onChange = e => {
    setValue(e.target.value);
  };
  return [ value, onChange ];
};

const CreateRecipe = (props) => {
  const [name, nameChange] = useInput("");
  const [ingredients, ingredientsChange] = useInput("");
  const [directions, directionsChange] = useInput("");
  const [calories, caloriesChange] = useInput("");
  const [protein, proteinChange] = useInput("");
  const [carbohydrates, carbsChange] = useInput("");
  const [fat, fatChange] = useInput("");


  const saveRecipe = async () => {
  const body = {
    name,
    ingredients,
    directions,
    calories,
    protein,
    carbohydrates,
    fat,
  };
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.error('Error in front-end:', error.message);
  }
};


  return (
    <div>
      <h3>New Recipe</h3>
      <p>
      <label htmlFor="name">Name:</label><input value={name} onChange={nameChange}></input>
      </p>
      <p>
        Ingredients: <input value={ingredients} onChange={ingredientsChange}></input>
      </p>
      <p>
        Directions: <input value={directions} onChange={directionsChange}></input>
      </p>
      <p>
        Calories: <input value={calories} onChange={caloriesChange}></input>
      </p>
      <p>
        Protein: <input value={protein} onChange={proteinChange}></input>
      </p>
      <p>
        Carbs: <input value={carbohydrates} onChange={carbsChange}></input>
      </p>
      <p>
        Fats: <input value={fat} onChange={fatChange}></input>
      </p>
      <button onClick={saveRecipe}>Submit</button>
    </div>
  );
};

export default CreateRecipe;
