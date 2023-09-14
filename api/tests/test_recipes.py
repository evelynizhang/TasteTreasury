from fastapi.testclient import TestClient
from main import app
from queries.recipes import RecipeQueries
from queries.tags import TagsQueries
from authenticator import authenticator
from models import RecipeIn, RecipeOut


client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "fakeuser"}


class FakeTagsQueries:
    def get_tags(self):
        return ["string"]


class FakeRecipeQueries:
    def get_all(self):
        return [
            {
                "id": 3,
                "name": "string",
                "prep_time": "string",
                "servings": 0,
                "picture_url": "jpg",
                "account_id": 3,
                "tags": ["Pork"],
            }
        ]

    def get_one(self, recipe_id: int):
        return {
            "id": recipe_id,
            "name": "string",
            "prep_time": "string",
            "servings": 0,
            "picture_url": "jpg",
            "account_id": 3,
            "ingredients": ["string"],
            "directions": [{"step_number": 0, "recipe_step": "string"}],
            "tags": ["chicken"],
        }

    def create(self, info: RecipeIn, account_id: int):
        return RecipeOut(id=1, **info.dict(), account_id=account_id)

    def delete(self, recipe_id: int, account_id: int):
        return {"is_deleted": "recipe has been deleted"}

    def update(self, recipe_id: int, info: RecipeIn, account_id: int):
        result = info.dict()
        result["account_id"] = account_id
        result["id"] = recipe_id
        return result

    def get_mine(self, account_id: int):
        return [
            {
                "id": 1,
                "name": "string",
                "prep_time": "string",
                "servings": 0,
                "picture_url": "string",
                "account_id": account_id,
                "tags": ["Pork"],
            }
        ]


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
            "picture_url": "jpg",
            "account_id": 3,
            "tags": ["Pork"],
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
        "picture_url": "jpg",
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


def test_delete_one_recipe():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    res = client.delete("/api/recipes/1")
    data = res.json()

    assert res.status_code == 200
    assert data == {"is_deleted": "recipe has been deleted"}


def test_update_recipe():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    app.dependency_overrides[authenticator.get_account_data] = fake_get_current_account_data
    body = {
        "name": "practice",
        "prep_time": "string",
        "servings": 0,
        "picture_url": "string",
        "ingredients": ["string"],
        "directions": [{"step_number": 0, "recipe_step": "string"}],
        "tags": ["string"],
    }
    res = client.put("/api/recipes/1", json=body)
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": 1,
        "name": "practice",
        "prep_time": "string",
        "servings": 0,
        "picture_url": "string",
        "account_id": 1,
        "ingredients": ["string"],
        "directions": [{"step_number": 0, "recipe_step": "string"}],
        "tags": ["string"],
    }


def test_get_my_recipes():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    app.dependency_overrides[authenticator.get_account_data] = fake_get_current_account_data
    res = client.get("/api/recipes/mine")
    data = res.json()
    assert res.status_code == 200
    assert data == [
        {
            "id": 1,
            "name": "string",
            "prep_time": "string",
            "servings": 0,
            "picture_url": "string",
            "account_id": 1,
            "tags": ["Pork"],
        }
    ]


def test_get_tags():
    app.dependency_overrides[TagsQueries] = FakeTagsQueries
    res = client.get("/api/tags")
    data = res.json()

    assert res.status_code == 200
    assert data == ["string"]
