from models import (
    AccountIn,
    AccountOut,
    DuplicateAccountError,
    AccountOutHashedPassword,
)
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
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return AccountOutHashedPassword(**record)

    def get_all(self):
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                # run our INSERT statement
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    """
                )
                result = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(record)
                return result

    def create(self, info: AccountIn, hashed_password: str):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                check = cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE email = %s
                    OR username = %s
                    """,
                    [info.email, info.username],
                )
                if check.fetchone():
                    raise DuplicateAccountError

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
                return AccountOut(id=id, username=info.username)
