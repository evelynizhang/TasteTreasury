from pydantic import BaseModel
from models import AccountIn, AccountOut, DuplicateAccountError, AccountOutHashedPassword
from queries.pool import pool


class AccountQueries:
    def get(self, username: str):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                # run our INSERT statement
                cur.execute(
                    """
                    SELECT id
                        , username
                        , hashed_password
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    print(cur.description)
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                print(record)
                return AccountOutHashedPassword(**record)
                #    id=result.fetchone()[0], username=username, hashed_password=result.fetchone()[2]
                # )

    def create(self, info: AccountIn, hashed_password: str):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                # run our INSERT statement
                result = cur.execute(
                    """
                    INSERT INTO accounts
                        (username, email, hashed_password)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [info.username, info.email, hashed_password],
                )
                id = result.fetchone()[0]
                # return new data
                return AccountOut(id=id, username=info.username)
