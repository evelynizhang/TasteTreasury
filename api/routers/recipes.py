from fastapi import APIRouter, Depends, HTTPException
from models import (
    RecipeOut,
    RecipeIn,
    RecipeCardOut,
    DeleteResponse,
    AccountOut,
)
from queries.recipes import RecipeQueries
from typing import List
from authenticator import authenticator


router = APIRouter()


def data_validation(info: RecipeIn):
    if len(info.name) > 100:
        raise HTTPException(status_code=422, detail="Recipe name must be no greater than 100 characters")
    if len(info.prep_time) > 100:
        raise HTTPException(status_code=422, detail="prep_time must be no greater than 100 characters")
    if info.servings < 0 or info.servings > 32767:
        raise HTTPException(
            status_code=422, detail="servings must be a non-negative integer value no greater than 32767"
        )
    if len(info.picture_url) > 1000:
        raise HTTPException(status_code=422, detail="picture_url must be no greater than 1000 characters")
    for ingredient in info.ingredients:
        if len(ingredient) > 100:
            raise HTTPException(status_code=422, detail="Each ingredient must be no greater than 100 characters")
    for direction in info.directions:
        if len(direction.recipe_step) > 1000:
            raise HTTPException(status_code=422, detail="Each recipe_step must be no greater than 1000 characters")


@router.post("/api/recipes", response_model=RecipeOut)
def create_recipe(
    info: RecipeIn,
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    data_validation(info)
    recipe = queries.create(info, account_data["id"])
    return recipe


@router.get("/api/recipes", response_model=List[RecipeCardOut])
def get_all_recipes(queries: RecipeQueries = Depends()):
    recipes = queries.get_all()
    return recipes


@router.get("/api/recipes/mine", response_model=List[RecipeCardOut])
def get_my_recipes(
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    recipes = queries.get_mine(account_data["id"])
    return recipes


@router.get("/api/recipes/{recipe_id}", response_model=RecipeOut)
def get_one_recipe(recipe_id: int, queries: RecipeQueries = Depends()):
    recipe = queries.get_one(recipe_id)
    return recipe


@router.delete("/api/recipes/{recipe_id}", response_model=DeleteResponse)
def delete_one_recipe(
    recipe_id: int,
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    is_deleted = queries.delete(recipe_id, account_data["id"])
    return is_deleted


@router.put("/api/recipes/{recipe_id}", response_model=RecipeOut)
def update_recipe(
    recipe_id: int,
    info: RecipeIn,
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    data_validation(info)
    recipe = queries.update(recipe_id, info, account_data["id"])
    return recipe
