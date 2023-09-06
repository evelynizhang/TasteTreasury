import { useGetMyRecipesQuery } from "./app/apiSlice";
import "./App";
import "./styles.css";
import { Link } from "react-router-dom";

function MyRecipes() {
  const myRecipes = useGetMyRecipesQuery();
  const data = myRecipes.data;

  if (myRecipes.status === "fulfilled") {
    return (
      <>
        <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Image</h1>
              <p className="lead fw-normal text-white-50 mb-0">Image text</p>
            </div>
          </div>
        </header>
        {/* Section*/}
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {data.map((recipe) => {
                let path = `/recipes/${recipe.id}`;
                const updateLink = `/recipes/update/${recipe.id}`;
                return (
                  <div className="col mb-5" key={recipe.id}>
                    <div className="card h-100">
                      {/* Product image*/}
                      <Link to={path}>
                        <img
                          className="card-img-top"
                          src={recipe.picture_url}
                          alt="..."
                        />

                        {/* Product details*/}
                        <div className="card-body p-4">
                          <div className="text-left">
                            {/* Product name*/}
                            <h5 className="fw-bolder">{recipe.name}</h5>
                            Extra Info
                          </div>
                          r
                        </div>
                        {/* Product actions*/}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-right">{recipe.prep_time}</div>
                        </div>
                      </Link>
                      {/* <Link to={updateLink}>
                        <button>update</button>
                      </Link> */}
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
