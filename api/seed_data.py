import os
from psycopg_pool import ConnectionPool
from recipe_data import recipes
from models import RecipeIn

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


def create_tags():
    # connect the db
    with pool.connection() as conn:
        # get a cursor to run SQL
        with conn.cursor() as cur:
            cur.execute(
                """
                    INSERT INTO tags (name)
                    VALUES ('Beef')
                        ,('Pork')
                        ,('Chicken')
                        ,('Seafood')
                        ,('Dairy')
                        ,('Dessert')
                        ,('Vegetarian')
                        ,('Vegan')
                        ,('Gluten Free')
                        ,('Keto')
                        ,('Low Carb')
                """
            )
            return print("tags created")


create_tags()


def create_recipe(info: RecipeIn):
    # connect the db
    with pool.connection() as conn:
        # get a cursor to run SQL
        with conn.cursor() as cur:
            result = cur.execute(
                """
                INSERT INTO recipes
                    (name, prep_time, servings, picture_url)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                [
                    info.name,
                    info.prep_time,
                    info.servings,
                    info.picture_url,
                ],
            )
            id = result.fetchone()[0]
            for ingredient in info.ingredients:
                cur.execute(
                    """
                    INSERT INTO ingredients
                        (item, recipe_id)
                    VALUES (%s, %s)
                    """,
                    [ingredient, id],
                )
            for direction in info.directions:
                cur.execute(
                    """
                    INSERT INTO directions
                        (recipe_step, step_number, recipe_id)
                    VALUES (%s, %s, %s)
                    """,
                    [direction.recipe_step, direction.step_number, id],
                )
            for tag in info.tags:
                cur.execute(
                    """
                    INSERT INTO recipe_tags
                        (recipe_id, tag_name)
                    VALUES (%s, %s)
                    """,
                    [id, tag],
                )
            return print("Recipe created")


for each in recipes["recipes"]:
    create_recipe(RecipeIn(**each))
