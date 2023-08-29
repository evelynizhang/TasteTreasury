from fastapi.testclient import TestClient
from main import app
from queries.recipes import RecipeQueries
from authenticator import authenticator


client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "fakeuser"}


class FakeRecipeQueries:
    def get_all(self):
        return [
            {
                "id": 3,
                "name": "string",
                "prep_time": "string",
                "servings": 0,
                "picture_url": "https://pinchofyum.com/wp-content/uploads/Instant-Pot-Mac-and-Cheese-Square.jpg",
                "account_id": 3,
            }
        ]

    def get_one(self, recipe_id: int):
        return {
            "id": recipe_id,
            "name": "string",
            "prep_time": "string",
            "servings": 0,
            "picture_url": "https://pinchofyum.com/wp-content/uploads/Instant-Pot-Mac-and-Cheese-Square.jpg",
            "account_id": 3,
            "ingredients": ["string"],
            "directions": [{"step_number": 0, "recipe_step": "string"}],
            "tags": ["chicken"],
        }


def test_get_all_recipes():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    res = client.get("/api/recipes")
    data = res.json()

    assert res.status_code == 200
    assert data == [
        {
            "id": 3,
            "name": "string",
            "prep_time": "string",
            "servings": 0,
            "picture_url": "https://pinchofyum.com/wp-content/uploads/Instant-Pot-Mac-and-Cheese-Square.jpg",
            "account_id": 3,
        }
    ]


def test_get_one_recipe():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    res = client.get("/api/recipes/3")
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": 3,
        "name": "string",
        "prep_time": "string",
        "servings": 0,
        "picture_url": "https://pinchofyum.com/wp-content/uploads/Instant-Pot-Mac-and-Cheese-Square.jpg",
        "account_id": 3,
        "ingredients": ["string"],
        "directions": [{"step_number": 0, "recipe_step": "string"}],
        "tags": ["chicken"],
    }


def test_create_recipe():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    app.dependency_overrides[authenticator.get_current_account_data] = FakeRecipeQueries
