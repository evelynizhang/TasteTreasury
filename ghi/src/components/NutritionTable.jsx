import "../css/SingleRecipe.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleRecipeQuery } from "../app/recipeApiSlice";
import { useCreateNutritionMutation } from "../app/nutritionApiSlice";

function Nutrition() {
  let { recipe_id } = useParams();
  const { data, isLoading, isError } = useGetSingleRecipeQuery(recipe_id);
  const [createNutritionData, createNutritionDataResponse] =
    useCreateNutritionMutation();

  useEffect(() => {
    if (data) {
      const nutritionInput = {};
      nutritionInput["title"] = data.name;
      nutritionInput["ingr"] = data.ingredients;
      createNutritionData(nutritionInput);
    }
  }, [data]);

  if (isError) return <h1>An error has occurred</h1>;
  if (isLoading) return <h1>Page still Loading</h1>;
  if (data.detail === "Unable to match id to existing recipe")
    return <h1>No Recipes Found</h1>;
  if (createNutritionDataResponse.status === "rejected") {
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

  if (createNutritionDataResponse.data) {
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
              {Math.round(
                createNutritionDataResponse.data.calories / data.servings
              )}
            </p>
            <p>
              Total CO2 Emissions:{" "}
              {Math.round(
                createNutritionDataResponse.data.totalCO2Emissions /
                  data.servings /
                  1000
              )}
              kg
            </p>
          </div>
          <table className="performance-facts__table">
            <tbody>
              <tr className="thick-row"></tr>
              <tr>
                <th colSpan="2">
                  <b>Total Fat</b>
                </th>
                <td>
                  <b>
                    {Math.round(
                      createNutritionDataResponse.data.totalNutrients.FAT
                        .quantity / data.servings
                    )}
                    {createNutritionDataResponse.data.totalNutrients.FAT.unit}
                  </b>
                </td>
              </tr>
              <tr>
                <th colSpan="2">
                  <b>Cholesterol</b>
                </th>
                <td>
                  <b>
                    {Math.round(
                      createNutritionDataResponse.data.totalNutrients.CHOLE
                        .quantity / data.servings
                    )}
                    {createNutritionDataResponse.data.totalNutrients.CHOLE.unit}
                  </b>
                </td>
              </tr>
              <tr>
                <th colSpan="2">
                  <b>Sodium</b>
                </th>
                <td>
                  <b>
                    {Math.round(
                      createNutritionDataResponse.data.totalNutrients.NA
                        .quantity / data.servings
                    )}
                    {createNutritionDataResponse.data.totalNutrients.NA.unit}
                  </b>
                </td>
              </tr>
              <tr>
                <th colSpan="2">
                  <b>Total Carbohydrate</b>
                </th>
                <td>
                  <b>
                    {Math.round(
                      createNutritionDataResponse.data.totalNutrients.CHOCDF
                        .quantity / data.servings
                    )}
                    {
                      createNutritionDataResponse.data.totalNutrients.CHOCDF
                        .unit
                    }
                  </b>
                </td>
              </tr>
              <tr>
                <th colSpan="2">
                  <b>Protein</b>
                </th>
                <td>
                  <b>
                    {Math.round(
                      createNutritionDataResponse.data.totalNutrients.PROCNT
                        .quantity / data.servings
                    )}
                    {
                      createNutritionDataResponse.data.totalNutrients.PROCNT
                        .unit
                    }
                  </b>
                </td>
              </tr>
              <tr>
                <th colSpan="2">
                  <b>Sugar</b>
                </th>
                <td>
                  <b>
                    {Math.round(
                      createNutritionDataResponse.data.totalNutrients.SUGAR
                        .quantity / data.servings
                    )}
                    {createNutritionDataResponse.data.totalNutrients.SUGAR.unit}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default Nutrition;
