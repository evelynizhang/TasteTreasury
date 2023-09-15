import { useGetMyRecipesQuery, useGetTokenQuery } from "../app/recipeApiSlice";
import "../App";
import "../css/AllRecipe.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Header from "../components/Banner";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import TagsFilter from "../components/TagsFilter";
import NoRecipes from "../components/NoRecipes";

function MyRecipes() {
  const searchCriteria = useSelector((state) => state.search.value);
  const tagsFilterCriteria = useSelector((state) => state.filterTags.value);
  const { data: account } = useGetTokenQuery();
  const { data: myRecipes, status } = useGetMyRecipesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) navigate("/login");
  }, [account]);

  const filteredData = () => {
    if (searchCriteria)
      return myRecipes.filter((recipe) => recipe.name.includes(searchCriteria));
    if (tagsFilterCriteria) {
      return myRecipes.filter((recipe) => {
        return tagsFilterCriteria.every((tag) => {
          return recipe.tags.includes(tag);
        });
      });
    }
    return myRecipes;
  };

  if (status === "fulfilled") {
    if (filteredData().length === 0) {
      return (
        <>
          <Header h1Input="Personal Recipes" />
          <TagsFilter />
          <SearchBar />
          <NoRecipes message="There are no recipes" />
        </>
      );
    }
    return (
      <>
        <Header h1Input="Personal Recipes" />
        <TagsFilter />
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
export default MyRecipes;
