import { useGetAllRecipesQuery } from "./app/apiSlice";
import "./App";
import "./css/AllRecipe.css";
import { Link } from "react-router-dom";

function AllRecipes() {
  const allRecipes = useGetAllRecipesQuery();
  const data = allRecipes.data;

  if (allRecipes.status === "fulfilled") {
    return (
      <>
        <header className="all-recipes-image py-5">
          <div className="container px-2 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">All Recipes</h1>
            </div>
          </div>
        </header>
        {/* Section*/}
        <section className="py-5">
          <div className="container px-4 mt-2">
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
              {data.map((recipe) => {
                let path = `/recipes/${recipe.id}`;
                return (
                  <div className="col" key={recipe.id}>
                    <div className="card pb-3 shadow mb-5 bg-body-tertiary rounded">
                      <div
                        className="badge bg-dark text-white position-absolute"
                        style={{ top: "0.5rem", right: "0.5rem", zIndex: 1 }}
                      >
                        {recipe.name}
                      </div>
                      {/* Product image*/}
                      <img
                        className="card-img-top"
                        src={recipe.picture_url}
                        alt="..."
                      />

                      {/* Product details*/}
                      <div className="card-body py-3 card-text-container">
                        <div className="text-center">
                          {/* Product name*/}
                          <h3 className="fw-medium">{recipe.name}</h3>
                          <div className="d-flex justify-content-around mt-3">
                            <h6 className="m-0">
                              <i className="bi bi-alarm"> </i>
                              {recipe.prep_time}
                            </h6>
                            <h6 className="m-0">
                              <i className="bi bi-people"> </i>
                              {recipe.servings} Servings
                            </h6>
                          </div>
                        </div>
                      </div>
                      {/* Product actions*/}
                      <Link to={path}>
                        <div className="d-grid gap-2 col-5 mx-auto">
                          <button type="button" className="btn btn-primary">
                            View
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default AllRecipes;
