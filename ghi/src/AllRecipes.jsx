import { useGetAllRecipesQuery } from "./app/apiSlice";
import "./App";
import "./styles.css";

function AllRecipes() {
  const allRecipes = useGetAllRecipesQuery();
  const data = allRecipes.data;
  console.log(data);
  if (allRecipes.status === "fulfilled") {
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
                return (
                  <div className="col mb-5">
                    <div className="card h-100" key={recipe.id}>
                      {/* Product image*/}
                      <a href="#">
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
                        </div>
                        {/* Product actions*/}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-right">{recipe.prep_time}</div>
                        </div>
                      </a>
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
