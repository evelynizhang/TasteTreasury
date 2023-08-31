import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleRecipeQuery,
  useDeleteRecipeMutation,
  useGetTokenQuery,
} from "./app/apiSlice";
import "./styles.css";

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
  const handleDelete = () => {
    deleteRecipe(Number(recipe_id));
  };

  if (isError) return <h1>An error has occurred</h1>;
  if (isLoading) return <h1>Page still Loading</h1>;
  if (data.detail === "Unable to match id to existing recipe")
    return <h1>No Recipes Found</h1>;

  return (
    <>
      <main className="wrapper">
        <section className="hero">
          <img
            src={data.picture_url}
            alt={data.name}
            style={{ maxHeight: "400px" }}
          />
          <h1>{data.name}</h1>
        </section>
        {getToken.data.id === data.account_id && (
          <button type="button" className="btn btn-primary m-1">
            Edit
          </button>
        )}
        {getToken.data.id === data.account_id && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <section className="single-recipe-space">
          <li>
            <div class="container text-left">
              {data.tags.map((tag) => {
                return (
                  <button type="button" class="btn btn-secondary btn-sm">
                    {tag}
                  </button>
                );
              })}
            </div>
          </li>
          <ul>
            <li>
              <h2>Ingredients</h2>
              {data.ingredients.map((i) => {
                return <p>{i}</p>;
              })}
            </li>
            <li>
              <h2>Directions</h2>
              {data.directions.map((d) => {
                return (
                  <p>
                    Step {d.step_number}: {d.recipe_step}
                  </p>
                );
              })}
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <h3>Little spacing at the bottom</h3>
      </footer>
    </>
  );
}

export default SingleRecipe;