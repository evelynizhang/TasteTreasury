import { useGetMyRecipesQuery, useGetTokenQuery } from "../app/recipeApiSlice";
import "../App";
import "../css/AllRecipe.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Header from "../components/HeaderRecipePages";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, useParams } from "react-router-dom";

function MyRecipes() {
  const searchCriteria = useSelector((state) => state.search.value);
  const { data, status } = useGetMyRecipesQuery();
  const { data: account } = useGetTokenQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) navigate("/login");
  }, [account]);

  const filteredData = () => {
    if (searchCriteria)
      return data.filter((recipe) => recipe.name.includes(searchCriteria));
    return data;
  };

  if (status === "fulfilled") {
    return (
      <>
        <Header h1Input="Personal Recipes" />
        <SearchBar />
        <section className="py-5">
          <div className="container px-4 mt-3">
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
              {filteredData().map((recipe) => {
                let path = `/recipes/${recipe.id}`;
                return (
                  <div className="col" key={recipe.id}>
                    <div className="card pb-3 shadow mb-5 bg-body-tertiary rounded">
                      <RecipeCard
                        imgSrc={recipe.picture_url}
                        h3Input={recipe.name}
                        biAlarmInput={recipe.prep_time}
                        biPeopleInput={recipe.servings}
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
export default MyRecipes;