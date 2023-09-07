import { useState, useEffect, React } from "react";
import { useCreateRecipeMutation, useGetAllTagsQuery } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../css/styles.css";
import FormButtons from "../components/FormButtons";
import FormInput from "../components/FormInput";

function RecipeForm() {
  const [name, setName] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [servings, setServings] = useState(0);
  const [picture_url, setPicture_url] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [directions, setDirections] = useState([
    { step_number: 0, recipe_step: "" },
  ]);
  const tagList = useGetAllTagsQuery();
  const [newRecipe, newRecipeResponse] = useCreateRecipeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (newRecipeResponse.isSuccess) navigate("/recipes");
  }, [newRecipeResponse]);

  const options = [];
  if (tagList.status === "fulfilled") {
    tagList.data.map((each) => {
      return options.push({ value: each, label: each });
    });
  }

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const tags = [];
  if (selectedOption) {
    selectedOption.map((each) => {
      return tags.push(each.value);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    newRecipe({
      name,
      prep_time,
      servings,
      picture_url,
      ingredients,
      directions,
      tags,
    });
  };

  const handleIngredientsAdd = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientRemove = (index) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const list = [...ingredients];
    list[index] = value;
    setIngredients(list);
  };

  const handleServing = (e) => {
    const { value } = e.target;
    setServings(Number(value));
  };

  const handleDirectionsAdd = () => {
    setDirections([...directions, {}]);
  };

  const handleDirectionRemove = (index) => {
    const list = [...directions];
    list.splice(index, 1);
    setDirections(list);
  };

  const handleDirectionChange = (e, index) => {
    const { value } = e.target;
    const list = [...directions];
    list[index]["step_number"] = index + 1;
    list[index]["recipe_step"] = value;
    setDirections(list);
  };

  return (
    <>
      <div className="body">
        <div className="col-md-6 offset-md-3">
          <h1>Add Recipe form</h1>
          <form onSubmit={handleSubmit}>
            <FormInput
              id="name"
              placeholder="Enter Recipe Name"
              labelText="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <FormInput
              id="prep_time"
              placeholder="Enter Preparation Time"
              labelText="Prep time"
              value={prep_time}
              onChange={(e) => setPrep_time(e.target.value)}
              type="text"
            />
            <FormInput
              id="servings"
              placeholder="Enter Servings"
              labelText="Servings"
              value={servings}
              onChange={(e) => handleServing(e)}
              type="number"
            />
            <FormInput
              id="picture_url"
              placeholder="Enter Picture URL"
              labelText="Picture url"
              value={picture_url}
              onChange={(e) => setPicture_url(e.target.value)}
              type="text"
            />
            <div className="form-group ">
              <label htmlFor="ingredients">Ingredients</label>
              {ingredients.map((singleIngredient, index) => (
                <div key={index} className="ingredients direction-box">
                  <div className="form-row input-group mb-1">
                    <input
                      type="ingredients"
                      className="form-control"
                      id="ingredients"
                      placeholder="Enter Ingredients"
                      value={singleIngredient}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                    <FormButtons
                      condition1={ingredients}
                      onClickRemove={() => handleIngredientRemove(index)}
                      onClickAdd={handleIngredientsAdd}
                      index={index}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="direction">Directions</label>
              {directions.map((singleDirection, index) => {
                let placeholderValue = `Step ${index + 1}`;
                return (
                  <div className="row direction-box" key={index}>
                    <div className="form-row input-group mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="Recipe Step"
                        placeholder={placeholderValue}
                        onChange={(e) => handleDirectionChange(e, index)}
                      />
                      <FormButtons
                        condition1={directions}
                        onClickRemove={() => handleDirectionRemove(index)}
                        onClickAdd={handleDirectionsAdd}
                        index={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <Select isMulti onChange={handleChange} options={options} />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RecipeForm;
