from fastapi.testclient import TestClient
from main import app
from queries.recipes import RecipeQueries
from authenticator import authenticator
from models import RecipeIn, RecipeOut


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

    def create(self, info: RecipeIn, account_id: int):
        return RecipeOut(id=1, **info.dict(), account_id=account_id)


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
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    body = {
        "name": "best pizza",
        "prep_time": "string",
        "servings": 0,
        "picture_url": "string",
        "ingredients": ["string"],
        "directions": [{"step_number": 0, "recipe_step": "string"}],
        "tags": ["pizza"],
    }
    res = client.post("/api/recipes", json=body)
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": 1,
        "name": "best pizza",
        "prep_time": "string",
        "servings": 0,
        "picture_url": "string",
        "ingredients": ["string"],
        "directions": [{"step_number": 0, "recipe_step": "string"}],
        "tags": ["pizza"],
        "account_id": 1,
    }
