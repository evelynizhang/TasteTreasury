import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


def create_tags():
    # connect the db
    with pool.connection() as conn:
        # get a cursor to run SQL
        with conn.cursor() as cur:
            cur.execute(
                """
                    INSERT INTO tags (name)
                    VALUES ('Vegetarian')
                        ,('Beef')
                        ,('Chicken')
                        ,('Dairy')
                        ,('Pork')
                        ,('Keto')
                        ,('Low Carb')
                        ,('Vegan')
                        ,('Gluten Free')
                """
            )
            return print("tags created")


create_tags()
