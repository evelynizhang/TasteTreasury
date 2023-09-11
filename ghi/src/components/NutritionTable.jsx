import "../css/SingleRecipe.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleRecipeQuery } from "../app/recipeApiSlice";
import { useCreateNutritionMutation } from "../app/nutritionApiSlice";
import NutritionTableRow from "./NutritionTableRow";

function Nutrition() {
  let { recipe_id } = useParams();
  const { data, isLoading, isError } = useGetSingleRecipeQuery(recipe_id);
  const [nutrition, nutritionResponse] = useCreateNutritionMutation();

  useEffect(() => {
    if (data) {
      const nutritionInput = {};
      nutritionInput["title"] = data.name;
      nutritionInput["ingr"] = data.ingredients;
      nutrition(nutritionInput);
    }
  }, [data]);

  if (isError) return <h1>An error has occurred</h1>;
  if (isLoading) return <h1>Page still Loading</h1>;
  if (data.detail === "Unable to match id to existing recipe")
    return <h1>No Recipes Found</h1>;
  if (nutritionResponse.status === "rejected") {
    return (
      <section className="performance-facts">
        <div className="performance-facts__header">
          <h1 className="performance-facts__title">Nutrition Facts</h1>
          <p>
            Recipe ingredients have insufficient quality to process correctly
          </p>
        </div>
      </section>
    );
  }

  if (nutritionResponse.data) {
    return (
      <div>
        <section className="performance-facts">
          <div className="performance-facts__header">
            <h1 className="performance-facts__title">Nutrition Facts</h1>
            <p>
              Serving Per Recipe: <span>{data.servings}</span>
            </p>
            <p>
              Calories Per Serving:{" "}
              {Math.round(nutritionResponse.data.calories / data.servings)}
            </p>
            <p>
              Total CO2 Emissions:{" "}
              {Math.round(
                nutritionResponse.data.totalCO2Emissions / data.servings / 1000
              )}
              kg
            </p>
          </div>
          <table className="performance-facts__table">
            <tbody>
              <tr className="thick-row"></tr>
              <NutritionTableRow
                type="Total Fat"
                amount={Math.round(
                  nutritionResponse.data.totalNutrients.FAT.quantity /
                    data.servings
                )}
                unit={nutritionResponse.data.totalNutrients.FAT.unit}
              />
              <NutritionTableRow
                type="Cholesterol"
                amount={Math.round(
                  nutritionResponse.data.totalNutrients.CHOLE.quantity /
                    data.servings
                )}
                unit={nutritionResponse.data.totalNutrients.CHOLE.unit}
              />
              <NutritionTableRow
                type="Sodium"
                amount={Math.round(
                  nutritionResponse.data.totalNutrients.NA.quantity /
                    data.servings
                )}
                unit={nutritionResponse.data.totalNutrients.NA.unit}
              />
              <NutritionTableRow
                type="Total Carbohydrate"
                amount={Math.round(
                  nutritionResponse.data.totalNutrients.CHOCDF.quantity /
                    data.servings
                )}
                unit={nutritionResponse.data.totalNutrients.CHOCDF.unit}
              />
              <NutritionTableRow
                type="Protein"
                amount={Math.round(
                  nutritionResponse.data.totalNutrients.PROCNT.quantity /
                    data.servings
                )}
                unit={nutritionResponse.data.totalNutrients.PROCNT.unit}
              />
              <NutritionTableRow
                type="Sugar"
                amount={Math.round(
                  nutritionResponse.data.totalNutrients.SUGAR.quantity /
                    data.servings
                )}
                unit={nutritionResponse.data.totalNutrients.SUGAR.unit}
              />
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default Nutrition;
