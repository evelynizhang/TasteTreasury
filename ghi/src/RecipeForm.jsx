import { useState, useEffect, React } from "react";
import { useGetAllTagsQuery, useCreateRecipeMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';


function RecipeForm() {
  const [formData, setFormData] = useState({
    name: "",
    prep_time: "",
    servings: "",
    picture_url: "",
    ingredients: [""],
    directions: [""],
    tags: [""],
  });
  const [ingredients, setIngredients] = useState([""]);
  const [directionsList, setDirectionsList] = useState([""]);
  const getTags = useGetAllTagsQuery();
  const [createRecipe, createRecipeResponse] = useCreateRecipeMutation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);




  const handleFormChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,
      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value,
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

  const handleDirectionsAdd = () => {
    setDirectionsList([...directionsList, ""]);
  };

  const handleDirectionRemove = (index) => {
    const list = [...directionsList];
    list.splice(index, 1);
    setDirectionsList(list);
  };

  const handleDirectionChange = (e, index) => {
    const { value } = e.target;
    const list = [...directionsList];
    list[index] = value;
    setDirectionsList(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let directions = [];
    for (let each of directionsList) {
      directions.push({
        step_number: directionsList.indexOf(each) + 1,
        recipe_step: each,
      });
    }
    setFormData({
      ...formData,
      servings: Number(formData.servings),
      ingredients,
      directions,
      tags: tags,
    });
    createRecipe(formData);
  };



  const options = []
  if (getTags.status === "fulfilled") {
    getTags.data.map((each) => {
      return (
        options.push({"value": each, "label": each})
      )
    })
  }


  const handleTagChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }
   const tags = []
  if (selectedOption) {
    selectedOption.map( (each) => {
      return tags.push(each.value)
    })
  }
  console.log(tags)


  useEffect(() => {
    if (createRecipeResponse.isSuccess) {
      let recipeUrl = `/recipes/${createRecipeResponse.data["id"]}`;
      navigate(recipeUrl);
    }
  }, [createRecipeResponse]);




  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new recipe</h1>
          <form onSubmit={handleSubmit} id="create-recipe-form">
            <div className="form-floating mb-3">
              <input
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Name your recipe"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Recipe title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.prep_time}
                onChange={handleFormChange}
                placeholder="Enter a time estimate"
                required
                type="text"
                name="prep_time"
                id="prep_time"
                className="form-control"
              />
              <label htmlFor="prep_time">Prep time</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.servings}
                onChange={handleFormChange}
                placeholder="Number of servings"
                required
                type="number"
                name="servings"
                id="servings"
                className="form-control"
              />
              <label htmlFor="servings">Number of servings</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.picture_url}
                onChange={handleFormChange}
                placeholder="Enter an image link (max 1000 characters)"
                required
                type="url"
                maxLength="1000"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">
                Image link - max 1000 characters
              </label>
            </div>
            <h6>Enter your ingredients</h6>
            <div className="form-floating mb-3">
              {ingredients.map((singleIngredient, index) => (
                <div key={index} className="ingredients">
                  <div className="form-row" >
                    <div className="col-9">
                    <input
                      type="ingredients"
                      className="form-control"
                      id="ingredients"
                      placeholder="Enter the next ingredient"
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


            <h6>Enter your directions</h6>
            <div className="form-floating mb-3">
              {directionsList.map((singleDirection, index) => (
                <div key={index} className="directions">
                  <div className="form-row" >
                    <div className="col-1">
                        <input className="form-control" type="text" name="step_number" value={index+1} readOnly></input>
                    </div>
                    <div className="col-10">
                    <input
                      type="directions"
                      className="form-control"
                      id="directions"
                      placeholder="Enter the next direction"
                      value={singleDirection}
                      onChange={(e) => handleDirectionChange(e, index)}
                    />
                  </div>

                  <div className="col-1">
                    {directionsList.length > 1 &&
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDirectionRemove(index)}
                      >
                        <span>X</span>
                      </button>
                    }
                  </div>
                  </div>
                  {directionsList.length - 1 === index &&
                    <div>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={handleDirectionsAdd}
                    >
                      <span>Add an direction</span>
                    </button>
                    </div>}

                </div>
              ))}
            </div>

            <div className="form-floating mb-3">
              <Select
                defaultValue={selectedOption}
                onChange={handleTagChange}
                options={options}
                isMulti
             />
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecipeForm;
