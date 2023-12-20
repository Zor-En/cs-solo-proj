import React, { useState } from "react";

const useInput = start => {
  const [ value, setValue ] = useState(start);
  const onChange = e => {
    setValue(e.target.value);
  };
  return [ value, onChange ];
};

const CreateRecipe = () => {
  const [image,setImage]= useState("")
  const [name, nameChange] = useInput("");
  const [ingredients, ingredientsChange] = useInput("");
  const [directions, directionsChange] = useInput("");
  const [calories, caloriesChange] = useInput("");
  const [protein, proteinChange] = useInput("");
  const [carbohydrates, carbsChange] = useInput("");
  const [fat, fatChange] = useInput("");

  const convertImg = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImage(reader.result)
    }
  }

  const saveRecipe = async () => {
  const body = {
    image,
    name,
    ingredients,
    directions,
    calories,
    protein,
    carbohydrates,
    fat,
  };
  try {
    const response = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // if (typeof calories !== 'number' && typeof protein !== 'number' && typeof carbohydrates !== 'number' && typeof fat !== 'number') {
    //   console.log('not a number')
    // }

    const data = await response.json();
    console.log(data)
    console.log('Data Posted!')
  } catch (error) {
    console.error('Error in front-end:', error.message);
  }
};

  return (
    <div id='create-recipe-container'>
      <h3>New Recipe</h3>
      <form  className='create-recipe-form'>
      {image === "" || image === null ? "" : <img width={250} height={250} src={image}/>}
      <input accept="image/" type='file' onChange={convertImg}></input>
      <label for="name">
        Name: <input value={name} onChange={nameChange}></input>
      </label>
      <label for="ingredients">
        Ingredients: <textarea rows={10} value={ingredients} onChange={ingredientsChange}></textarea>
      </label>
      <label for="directions">
        Directions: <textarea rows={10} value={directions} onChange={directionsChange}></textarea>
      </label>
      <label for="calories">
        Calories: <input value={calories} onChange={caloriesChange}></input>
      </label>
      <label for="protein">
        Protein: <input value={protein} onChange={proteinChange}></input>
      </label>
      <label for="carbohydrates">
        Carbs: <input value={carbohydrates} onChange={carbsChange}></input>
      </label>
      <label for="fat">
        Fats: <input value={fat} onChange={fatChange}></input>
      </label>
      </form>
      <button className='save-recipe-button' onClick={saveRecipe}>Submit</button>
    </div>
  );
};

export default CreateRecipe;
