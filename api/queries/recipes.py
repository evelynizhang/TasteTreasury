from models import RecipeIn, RecipeOut, Direction, HttpError
from queries.pool import pool
from fastapi import HTTPException


class RecipeQueries:
    def get_one(self, recipe_id: int):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                recipe_data = cur.execute(
                    """
                    SELECT name, prep_time, servings, picture_url, account_id
                    FROM recipes
                    WHERE id = %s
                    """,
                    [recipe_id],
                )
                # tuple containing specified values from recipe table
                recipe = recipe_data.fetchone()
                if recipe is None:
                    raise HTTPException(status_code=400, detail="Unable to match id to existing recipe")
                ingredients_data = cur.execute(
                    """
                    SELECT item
                    FROM ingredients
                    WHERE recipe_id = %s
                    """,
                    [recipe_id],
                )
                # convert from list of tuples to list of tuple[0] elements
                ingredients = []
                for ingredient in ingredients_data.fetchall():
                    ingredients.append(ingredient[0])
                directions_data = cur.execute(
                    """
                    SELECT recipe_step, step_number
                    FROM directions
                    WHERE recipe_id = %s
                    """,
                    [recipe_id],
                )
                # convert from list of tuples to list of Direction objects
                directions = []
                for direction in directions_data.fetchall():
                    directions.append(Direction(step_number=direction[1], recipe_step=direction[0]))
                tags_data = cur.execute(
                    """
                    SELECT tag_name
                    FROM recipe_tags
                    WHERE recipe_id = %s
                    """,
                    [recipe_id],
                )
                # convert from list of tuples to list of tuple[0] elements
                tags = []
                for tag in tags_data.fetchall():
                    tags.append(tag[0])
                return RecipeOut(
                    id=recipe_id,
                    name=recipe[0],
                    prep_time=recipe[1],
                    servings=recipe[2],
                    picture_url=recipe[3],
                    account_id=recipe[4],
                    ingredients=ingredients,
                    directions=directions,
                    tags=tags,
                )

    def get_all(self):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM recipes
                    """
                )
                result = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(record)
                return result

    def get_mine(self, account_id: int):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM recipes
                    WHERE account_id = %s
                    """,
                    [account_id],
                )
                result = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(record)
                return result

    def create(self, info: RecipeIn, account_id: int):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO recipes
                        (name, prep_time, servings, picture_url, account_id)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        info.name,
                        info.prep_time,
                        info.servings,
                        info.picture_url,
                        account_id,
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
                return RecipeOut(id=id, **info.dict(), account_id=account_id)

    def delete(self, recipe_id: int, account_id: int):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                recipe = cur.execute(
                    """
                    SELECT id, account_id
                    FROM recipes
                    WHERE id = %s
                    AND account_id = %s
                    """,
                    [recipe_id, account_id],
                )
                result = recipe.fetchone()
                if result is None:
                    raise HTTPException(status_code=400, detail="recipe does not exist/user lacks auth to update")
                cur.execute(
                    """
                    DELETE FROM recipes
                    WHERE id = %s
                    """,
                    [recipe_id],
                )
                return {"is_deleted": "recipe has been deleted"}

    def update(self, recipe_id: int, info: RecipeIn, account_id: int):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                recipe = cur.execute(
                    """
                    SELECT id, account_id
                    FROM recipes
                    WHERE id = %s
                    AND account_id = %s
                    """,
                    [recipe_id, account_id],
                )
                result = recipe.fetchone()
                print(result)
                if result is None:
                    raise HTTPException(status_code=400, detail="recipe does not exist/user lacks auth to update")
                cur.execute(
                    """
                    UPDATE recipes
                    SET name = %s,
                    prep_time = %s,
                    servings = %s,
                    picture_url = %s
                    WHERE id = %s
                    """,
                    [
                        info.name,
                        info.prep_time,
                        info.servings,
                        info.picture_url,
                        recipe_id,
                    ],
                )
                cur.execute(
                    """
                    DELETE FROM ingredients
                    WHERE recipe_id = %s
                    """,
                    [recipe_id],
                )
                cur.execute(
                    """
                    DELETE FROM directions
                    WHERE recipe_id = %s
                    """,
                    [recipe_id],
                )
                cur.execute(
                    """
                    DELETE FROM recipe_tags
                    WHERE recipe_id = %s
                    """,
                    [recipe_id],
                )
                for ingredient in info.ingredients:
                    cur.execute(
                        """
                        INSERT INTO ingredients
                            (item, recipe_id)
                        VALUES (%s, %s)
                        """,
                        [ingredient, recipe_id],
                    )
                for direction in info.directions:
                    cur.execute(
                        """
                        INSERT INTO directions
                            (recipe_step, step_number, recipe_id)
                        VALUES (%s, %s, %s)
                        """,
                        [
                            direction.recipe_step,
                            direction.step_number,
                            recipe_id,
                        ],
                    )
                for tag in info.tags:
                    cur.execute(
                        """
                        INSERT INTO recipe_tags
                            (recipe_id, tag_name)
                        VALUES (%s, %s)
                        """,
                        [recipe_id, tag],
                    )
                return RecipeOut(id=recipe_id, **info.dict(), account_id=account_id)
