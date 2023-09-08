import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleRecipeQuery,
  useDeleteRecipeMutation,
  useGetTokenQuery,
} from "../app/apiSlice";
import "../css/SingleRecipe.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import Nutrition from "../components/NutritionTable";

function SingleRecipe() {
  let { recipe_id } = useParams();
  const [deleteRecipe, deleteRecipeResponse] = useDeleteRecipeMutation();
  const { data, isLoading, isError } = useGetSingleRecipeQuery(
    Number(recipe_id)
  );
  const getToken = useGetTokenQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteRecipeResponse.isSuccess) navigate("/recipes/mine");
  }, [deleteRecipeResponse]);

  const handleSubmit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRecipe(Number(recipe_id)),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  if (isError) return <h1>An error has occurred</h1>;
  if (isLoading) return <h1>Page still Loading</h1>;
  if (data.detail === "Unable to match id to existing recipe")
    return <h1>No Recipes Found</h1>;
  const updateLink = `/recipes/update/${recipe_id}`;
  return (
    <>
      <main className="container px-5 my-5">
        <section className="main">
          <ul>
            <li>
              <figure>
                <div className="d-flex justify-content-between">
                  <div className="left-side">
                    <h3>{data.name}</h3>
                  </div>
                  <div className="right-side">
                    {getToken.data && getToken.data.id === data.account_id && (
                      <Link to={updateLink}>
                        <button
                          type="button"
                          className="btn btn-outline-primary mr-2"
                        >
                          Edit
                        </button>
                      </Link>
                    )}
                    {getToken.data && getToken.data.id === data.account_id && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary mr-2"
                        onClick={handleSubmit}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <img
                  src={
                    data.picture_url ||
                    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
                  }
                  alt={data.name}
                  style={{
                    maxHeight: "800px",
                    position: "relative",
                    top: "20%",
                  }}
                />
                <figcaption className="d-flex justify-content-start">
                  <h3>Prep: {data.prep_time}</h3>
                  <div className="m-3" />
                  <h3>Servings: {data.servings}</h3>
                </figcaption>
              </figure>
              <div className="d-flex justify-content-end">
                {data.tags.map((tag) => {
                  return (
                    <button
                      key={tag}
                      type="button"
                      className="btn btn-outline-primary mr-2"
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </li>
          </ul>
        </section>
        <section className="main">
          <ul>
            <div>
              <li className="text-left">
                <h4>Ingredients</h4>
                {data.ingredients.map((i) => {
                  return <h5 key={i}>{i}</h5>;
                })}
              </li>
              <Nutrition className="text-left" />
            </div>
            <li className="text-left">
              <h4>Directions</h4>
              {data.directions.map((d) => {
                return (
                  <h5 className="lh-base" key={d.step_number}>
                    <span style={{ color: "orange", fontWeight: "bold" }}>
                      Step {d.step_number}:{" "}
                    </span>
                    {d.recipe_step}
                  </h5>
                );
              })}
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default SingleRecipe;
