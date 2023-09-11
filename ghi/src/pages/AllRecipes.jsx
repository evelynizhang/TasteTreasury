import { useGetAllRecipesQuery } from "../app/recipeApiSlice";
import "../App";
import "../css/AllRecipe.css";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import RecipeCard from "../components/RecipeCard";

function AllRecipes() {
  const searchCriteria = useSelector((state) => state.search.value);
  const allRecipes = useGetAllRecipesQuery();
  const data = allRecipes.data;

  const filteredData = () => {
    if (searchCriteria)
      return data.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchCriteria.toLowerCase())
      );
    return data;
  };

  if (allRecipes.status === "fulfilled") {
    return (
      <>
        <Banner page_name="All Recipes" />
        <SearchBar />
        <section className="py-5 ">
          <div className="container px-4 mt-3">
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
              {filteredData().map((recipe) => {
                let path = `/recipes/${recipe.id}`;
                return (
                  <div className="col" key={recipe.id}>
                    <div className="card pb-3 shadow mb-5 bg-body-tertiary rounded">
                      <RecipeCard
                        imgSrc={recipe.picture_url}
                        name={recipe.name}
                        prep_time={recipe.prep_time}
                        servings={recipe.servings}
                        pathInput={path}
                      />
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
