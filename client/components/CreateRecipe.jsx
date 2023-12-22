import React, { useState } from "react";

//inspo from star wars units
const useInput = ({start}) => {
  const [value, setValue] = useState(start);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const CreateRecipe = () => {
  const [image, setImage] = useState("");
  const [name, setNewName] = useInput("");
  const [ingredients, setNewIngredients] = useInput("");
  const [directions, setNewDirections] = useInput("");
  const [calories, setNewCalories] = useInput("");
  const [protein, setNewProtein] = useInput("");
  const [carbohydrates, setNewCarbs] = useInput("");
  const [fat,setNewFat] = useInput("");

  const [showForm, setShowForm] = useState(false);

  //converts image to base64 to be uploaded to db
  const convertImg = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

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

      const data = await response.json();
      console.log(data);
      console.log("Data Posted!");
    } catch (error) {
      console.error("Error in front-end:", error.message);
    }
  };

  //show create recipe form
  const showFormButton = () => {
    setShowForm(true);
  };

  return (
    <div className="create-recipe-container">
      <h2>Add New Recipes!</h2>
      {!showForm ? <button onClick={showFormButton}>Add Recipe</button> : 
      <form className="create-recipe-form"> 
        {image === "" || image === null ? ("") : <img width={250} height={250} src={image} alt="Recipe Image" />}
        <input accept="image/" type="file" onChange={convertImg}></input>
        <label> Name: <input value={name || ""} onChange={setNewName}></input></label>
        <label>Ingredients: <textarea rows={10} value={ingredients || ""} onChange={setNewIngredients}></textarea></label>
        <label>Directions: <textarea rows={10} value={directions || ""} onChange={setNewDirections}></textarea></label>
        <label>Calories: <input value={calories || ""} onChange={setNewCalories} type="number"></input></label>
        <label>Protein: <input value={protein || ""} onChange={setNewProtein} type="number"></input></label>
        <label>Carbohydrates: <input value={carbohydrates || ""}  onChange={setNewCarbs} type="number"></input></label>
        <label>Fat: <input value={fat || ""} onChange={setNewFat}type="number"></input></label>
        <button className="save-recipe-button" onClick={saveRecipe}>Submit</button>
      </form>}
    </div>
  );
};

export default CreateRecipe;
