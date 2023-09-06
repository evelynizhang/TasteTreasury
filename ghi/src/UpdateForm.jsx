import {
  useUpdateRecipeMutation,
  useGetSingleRecipeQuery,
} from "./app/apiSlice";
import Select from "react-select";
import { useState, useEffect, React } from "react";
import { useGetAllTagsQuery } from "./app/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

function UpdateForm() {
  let { recipe_id } = useParams();
  const [name, setName] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [servings, setServings] = useState(0);
  const [picture_url, setPicture_url] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [directions, setDirections] = useState([
    { step_number: 0, recipe_step: "" },
  ]);
  const tagList = useGetAllTagsQuery();
  const navigate = useNavigate();

  const [updateRecipe, updateRecipeResponse] = useUpdateRecipeMutation();

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

  const handleUpdate = (e) => {
    e.preventDefault();
    updateRecipe({
      recipe_id,
      name,
      prep_time,
      servings,
      picture_url,
      ingredients,
      directions,
      tags,
    });
  };

  useEffect(() => {
    if (updateRecipeResponse.isSuccess) navigate("/recipes/mine");
  }, [updateRecipeResponse, navigate]);

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

  const {
    data: recipeData,
    isLoading,
    isError,
  } = useGetSingleRecipeQuery(recipe_id);

  useEffect(() => {
    if (recipeData) {
      setName(recipeData.name || "");
      setPrep_time(recipeData.prep_time || "");
      setServings(recipeData.servings || 0);
      setPicture_url(recipeData.picture_url || "");
      setIngredients(recipeData.ingredients || [""]);
      setDirections(
        recipeData.directions || [{ step_number: 1, recipe_step: "" }]
      );
      setSelectedOption(
        recipeData.tags.map((tag) => ({ value: tag, label: tag })) || []
      );
      // navigate("/recipes/mine");
    }
  }, [recipeData]);
  if (isError) return <div>An error has occurred!</div>;
  if (isLoading) return <div>An error has occurred!</div>;

  return (
    <>
      <div className="col-md-6 offset-md-3">
        <h1>Update Recipe form</h1>
        <form onSubmit={handleUpdate}>
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
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleIngredientRemove(index)}
                    >
                      <span>X</span>
                    </button>
                  )}
                  {ingredients.length - 1 === index && (
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={handleIngredientsAdd}
                    >
                      <span>+</span>
                    </button>
                  )}
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
                      value={singleDirection.recipe_step}
                      onChange={(e) => handleDirectionChange(e, index)}
                    />
                    {directions.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm "
                        onClick={() => handleDirectionRemove(index)}
                      >
                        <span>X</span>
                      </button>
                    )}
                    {directions.length - 1 === index && (
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={handleDirectionsAdd}
                      >
                        <span>+</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <Select
              isMulti
              onChange={handleChange}
              options={options}
              value={selectedOption}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Recipe
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateForm;
