import {
  useUpdateRecipeMutation,
  useGetSingleRecipeQuery,
  useGetAllTagsQuery,
  useGetTokenQuery,
} from "../app/apiSlice";
import Select from "react-select";
import { useState, useEffect, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormButtons from "../components/FormButtons";

function UpdateForm() {
  let { recipe_id } = useParams();
  const {
    data: recipeData,
    isLoading,
    isError,
  } = useGetSingleRecipeQuery(recipe_id);
  const [name, setName] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [servings, setServings] = useState(0);
  const [picture_url, setPicture_url] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [directions, setDirections] = useState([
    { step_number: 0, recipe_step: "" },
  ]);
  const tagList = useGetAllTagsQuery();
  const [updateRecipe, updateRecipeResponse] = useUpdateRecipeMutation();
  const { data: account } = useGetTokenQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (account !== undefined && recipeData) {
      if (account && account.id !== recipeData.account_id) {
        navigate(`/recipes/${recipe_id}`);
      }
      if (!account) navigate("/login");
    }
  }, [account, recipeData]);

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
    if (updateRecipeResponse.isSuccess) navigate(`/recipes/${recipe_id}`);
  }, [updateRecipeResponse]);

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

  const handleDirectionsAdd = (index) => {
    setDirections([...directions, { step_number: index + 2, recipe_step: "" }]);
  };

  const handleDirectionRemove = (index) => {
    let list = [...directions];
    list.splice(index, 1);
    const newList = [];
    let idx = 1;
    for (let each of list) {
      let dir = { step_number: idx, recipe_step: each["recipe_step"] };
      newList.push(dir);
      idx++;
    }
    setDirections(newList);
  };

  const handleDirectionChange = (e, index) => {
    const { value } = e.target;
    let list = [...directions];
    const newDir = {};
    newDir["step_number"] = index + 1;
    newDir["recipe_step"] = value;
    list[index] = newDir;
    setDirections(list);
  };

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
    }
  }, [recipeData]);
  if (isError) return <div>An error has occurred!</div>;
  if (isLoading) return <div>Still loading!</div>;

  return (
    <>
      <div className="col-md-6 offset-md-3">
        <h1>Update Recipe form</h1>
        <form onSubmit={handleUpdate}>
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
                      value={singleDirection.recipe_step}
                      onChange={(e) => handleDirectionChange(e, index)}
                    />
                    <FormButtons
                      condition1={directions}
                      onClickRemove={() => handleDirectionRemove(index)}
                      onClickAdd={() => handleDirectionsAdd(index)}
                      index={index}
                    />
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
