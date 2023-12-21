import React, { useState } from "react";

const useInput = ({start}) => {
  const [value, setValue] = useState(start);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const CreateRecipe = () => {
  const [image, setImage] = useState("");
  const [name, nameChange] = useInput("");
  const [ingredients, ingredientsChange] = useInput("");
  const [directions, directionsChange] = useInput("");
  const [calories, caloriesChange] = useInput("");
  const [protein, proteinChange] = useInput("");
  const [carbohydrates, carbsChange] = useInput("");
  const [fat, fatChange] = useInput("");

  const [showForm, setShowForm] = useState(false);

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
      {!showForm ? (
        <button onClick={showFormButton}>Add Recipe</button>
      ) : (
        <form className="create-recipe-form">
          {image === "" || image === null ? (
            ""
          ) : (
            <img width={250} height={250} src={image} alt="Recipe" />
          )}
          <input accept="image/" type="file" onChange={convertImg}></input>
          <label htmlFor="name">
            Name: <input value={name || ""} onChange={nameChange}></input>
          </label>
          <label htmlFor="ingredients">
            Ingredients:{" "}
            <textarea
              rows={10}
              value={ingredients || ""}
              onChange={ingredientsChange}
            ></textarea>
          </label>
          <label htmlFor="directions">
            Directions:{" "}
            <textarea
              rows={10}
              value={directions || ""}
              onChange={directionsChange}
            ></textarea>
          </label>
          <label htmlFor="calories">
            Calories: <input value={calories || ""} onChange={caloriesChange}></input>
          </label>
          <label htmlFor="protein">
            Protein: <input value={protein || ""} onChange={proteinChange}></input>
          </label>
          <label htmlFor="carbohydrates">
            Carbs: <input value={carbohydrates || ""}  onChange={carbsChange}></input>
          </label>
          <label htmlFor="fat">
            Fats: <input value={fat || ""} onChange={fatChange}></input>
          </label>
          <button className="save-recipe-button" onClick={saveRecipe}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRecipe;
