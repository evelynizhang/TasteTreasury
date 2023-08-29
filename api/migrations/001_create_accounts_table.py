steps = [
    [
        """
CREATE TABLE accounts (
id SERIAL PRIMARY KEY NOT NULL UNIQUE,
username VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(254) UNIQUE NOT NULL,
hashed_password VARCHAR(1000) NOT NULL
)
""",
        """
DROP TABLE accounts
""",
    ]
]
