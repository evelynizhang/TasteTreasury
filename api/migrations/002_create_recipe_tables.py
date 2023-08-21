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
            name VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE
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
            step_number SMALLINT,
            recipe_id INT,
            CONSTRAINT FK_recipes
            FOREIGN KEY (recipe_id) REFERENCES recipes (id),
            CONSTRAINT unique_steps
            UNIQUE (recipe_id, step_number)
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
            tag_name VARCHAR(50),
            CONSTRAINT recipe_tags_pk PRIMARY KEY (recipe_id, tag_name),
            CONSTRAINT FK_recipes
            FOREIGN KEY (recipe_id) REFERENCES recipes (id),
            CONSTRAINT FK_tags
            FOREIGN KEY (tag_name) REFERENCES tags (name)
        );
        """,
        """
        DROP TABLE recipes_tags;
        """,
    ],
]
