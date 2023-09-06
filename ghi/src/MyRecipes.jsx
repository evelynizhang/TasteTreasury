import { useGetMyRecipesQuery } from "./app/apiSlice";
import "./App";
import "./css/AllRecipe.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

function MyRecipes() {
  const searchCriteria = useSelector((state) => state.search.value);

  const myRecipes = useGetMyRecipesQuery();
  const data = myRecipes.data;

  const filteredData = () => {
    if (searchCriteria)
      return data.filter((recipe) => recipe.name.includes(searchCriteria));
    return data;
  };

  if (myRecipes.status === "fulfilled") {
    return (
      <>
        <header className="all-recipes-image py-5">
          <div className="container px-2 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Personal Recipes</h1>
            </div>
          </div>
        </header>
        <SearchBar />
        {/* Section*/}
        <section className="py-5">
          <div className="container px-4 mt-3">
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
              {filteredData().map((recipe) => {
                let path = `/recipes/${recipe.id}`;
                return (
                  <div className="col" key={recipe.id}>
                    <div className="card pb-3 shadow mb-5 bg-body-tertiary rounded">
                      {/* Product image*/}

                      <img
                        className="card-img-top"
                        src={
                          recipe.picture_url ||
                          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
                        }
                        alt="..."
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&w=1000&q=80";
                        }}
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
export default MyRecipes;
