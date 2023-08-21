from models import RecipeIn, RecipeOut
from queries.pool import pool



class RecipeQueries:
    def create(self, info: RecipeIn):
         with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                # run our INSERT statement
                result = cur.execute(
                    """
                    INSERT INTO recipes
                        (name, prep_time, servings, picture_url)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [info.name,
                     info.prep_time,
                     info.servings,
                     info.picture_url],
                )
                id = result.fetchone()[0]

                for ingredient in info.ingredients:
                    cur.execute(
                        """
                        INSERT INTO ingredients
                            (item, recipe_id)
                        VALUES (%s, %s)
                        """,
                        [ingredient, id]
                    )
                for direction in info.directions:
                    cur.execute(
                        """
                        INSERT INTO directions
                            (recipe_step, step_number, recipe_id)
                        VALUES (%s, %s, %s)
                        """,
                        [direction.recipe_step, direction.step_number, id]
                    )
                for tag in info.tags:
                    cur.execute(
                        """
                        INSERT INTO recipe_tags
                            (recipe_id, tag_name)
                        VALUES (%s, %s)
                        """,
                        [id, tag]
                    )

                return RecipeOut(
                    id=id,
                    **info.dict()
                )
