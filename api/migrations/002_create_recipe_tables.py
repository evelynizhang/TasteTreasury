steps = [
    [
        """
        CREATE TABLE recipes (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            prep_time VARCHAR(100),
            servings SMALLINT,
            picture_url VARCHAR(1000)
        );
        """,
        """
        DROP TABLE recipes;
        """,
    ],
    [
        """
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        """,
        """
        DROP TABLE tags;
        """,
    ],
    [
        """
        CREATE TABLE ingredients (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            item VARCHAR(100) NOT NULL,
            recipe_id INT,
            CONSTRAINT FK_recipes
            FOREIGN KEY (recipe_id) REFERENCES recipes (id)
        );
        """,
        """
        DROP TABLE ingredients;
        """,
    ],
    [
        """
        CREATE TABLE directions (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            recipe_step VARCHAR(1000) NOT NULL,
            recipe_id INT,
            CONSTRAINT FK_recipes
            FOREIGN KEY (recipe_id) REFERENCES recipes (id)
        );
        """,
        """
        DROP TABLE directions;
        """,
    ],
    [
        """
        CREATE TABLE recipe_tags (
            recipe_id INT,
            tag_id INT,
            CONSTRAINT recipe_tags_pk PRIMARY KEY (recipe_id, tag_id),
            CONSTRAINT FK_recipes
            FOREIGN KEY (recipe_id) REFERENCES recipes (id),
            CONSTRAINT FK_tags
            FOREIGN KEY (tag_id) REFERENCES tags (id)
        );
        """,
        """
        DROP TABLE recipes_tags;
        """,
    ],
]
