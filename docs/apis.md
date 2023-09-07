# APIs

## Recipes

- **Method**: `POST`, `GET`, `GET`, `PUT`, `DELETE`,
- **Path**: `/api/recipes`, `/api/recipes/<id:pk>`

Input:

```json
{
  "name": "string",
  "prep_time": "string",
  "servings": 0,
  "picture_url": "string",
  "ingredients": ["string"],
  "directions": [
    {
      "step_number": 0,
      "recipe_step": "string"
    }
  ],
  "tags": ["string"]
}
```

Output:

```json
{
  "name": "string",
  "prep_time": "string",
  "servings": 0,
  "picture_url": "string",
  "ingredients": ["string"],
  "directions": [
    {
      "step_number": 0,
      "recipe_step": "string"
    }
  ],
  "tags": ["string"]
}
```

When you create a new recipe, it captures and stores various details such as the recipe's name, picture URL, preparation time, servings, ingredients, directions, step number, recipe step, and tags. This action adds the newly created recipe to the database, where it can be accessed, modified, or deleted by the user.

## Accounts

- **Method**: `POST`, `GET`,
- **Path**: `/api/accounts`, `/api/accounts/<id:pk>`
  Input:

```json
{
  "username": string,
  "email": string,
  "password": string,
}
```

Output:

```json
{
  "username": string,
  "email": string,
  "password": string,
}
```

When you create a new user account, it stores your username, email, and password. You also have the option to log in as an existing user. Once logged in, you gain access to the database, enabling you to create, modify, and remove your own recipes. Users who are not logged in can still browse and view all the available recipes.
