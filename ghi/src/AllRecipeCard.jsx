import { useGetRecipeQuery } from "./app/apiSlice"


function AllRecipeCard() {
  const recipes = useGetRecipeQuery();
  const data = recipes.data
  if (recipes.status === "fulfilled") {
  return (
    <div className="row row-cols-3 g-3">
       {data.map(recipe => {
          return (
      <div className="col" key={recipe.id}>
          <div key={recipe.id} className="card mb-3 h-50" >
              <img src={recipe.picture_url} className="card-img-top" alt="..." height="300" />
              <div className="card-body">
                <h5 className="card-title">{recipe.name} </h5>
              </div>
              <div className="card-footer">
                <h6 className="text-muted">prep time: {recipe.prep_time}</h6>
              </div>
          </div>
      </div>
       )})
        }
    </div>
  );}
}

export default AllRecipeCard;
