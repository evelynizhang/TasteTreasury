import { useState, useEffect, React } from "react";
import { useCreateRecipeMutation, useGetAllTagsQuery } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

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
      <div className="col-md-6 offset-md-3">
        <h1>Add Recipe form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Recipe Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="prep_time">Prep_time</label>
            <input
              type="prep_time"
              className="form-control"
              id="prep_time"
              value={prep_time}
              onChange={(e) => setPrep_time(e.target.value)}
              placeholder="Enter Preparation Time"
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={servings}
              onChange={(e) => handleServing(e)}
              placeholder="Enter Servings"
            />
          </div>

          <div className="form-group">
            <label htmlFor="picture_url">Picture url</label>
            <input
              type="text"
              className="form-control"
              id="picture_url"
              value={picture_url}
              onChange={(e) => setPicture_url(e.target.value)}
              placeholder="Enter Picture URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>

            {ingredients.map((singleIngredient, index) => (
              <div key={index} className="ingredients">
                <div className="form-row">
                  <div className="col-9">
                    <input
                      type="ingredients"
                      className="form-control"
                      id="ingredients"
                      placeholder="Enter Ingredients"
                      value={singleIngredient}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                  </div>
                  <div className="col-2">
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleIngredientRemove(index)}
                      >
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
                {ingredients.length - 1 === index && (
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={handleIngredientsAdd}
                  >
                    <span>Add an ingredient</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="direction">Directions</label>
            {directions.map((singleDirection, index) => (
              <div className="row" key={index}>
                <div className="form-row">
                  <div className="col-1">
                    {index === 0 && <label htmlFor="Step">Step</label>}
                    <input
                      className="form-control"
                      type="text"
                      name="step_number"
                      value={index + 1}
                      readOnly
                    ></input>
                  </div>
                  <div className="col-10">
                    {index === 0 && (
                      <label htmlFor="Recipe Step">Direction</label>
                    )}
                    <input
                      type="text"
                      className="form-control"
                      id="Recipe Step"
                      placeholder="Recipe Step"
                      onChange={(e) => handleDirectionChange(e, index)}
                    />
                  </div>

                  <div className="col-1">
                    {directions.length > 1 && index !== 0 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm "
                        onClick={() => handleDirectionRemove(index)}
                      >
                        <span>X</span>
                      </button>
                    )}
                  </div>
                </div>

                {directions.length - 1 === index && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={handleDirectionsAdd}
                    >
                      add another step
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <Select isMulti onChange={handleChange} options={options} />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
}

export default RecipeForm;
