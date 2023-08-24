from fastapi import APIRouter, Depends, HTTPException
from models import RecipeOut, RecipeIn, HttpError, RecipeCardOut, DeleteResponse, AccountOut
from queries.recipes import RecipeQueries
from typing import List
from authenticator import authenticator


router = APIRouter()


@router.post("/api/recipes/mine", response_model=RecipeOut | HttpError)
def create_recipe(
    info: RecipeIn,
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    try:
        recipe = queries.create(info, account_data["id"])
    except:
        raise HTTPException(status_code=400, detail="Unable to create a recipe")
    return recipe


@router.get("/api/recipes", response_model=List[RecipeCardOut] | HttpError)
def get_all_recipes(queries: RecipeQueries = Depends()):
    try:
        recipes = queries.get_all()
    except:
        raise HTTPException(status_code=400, detail="Unable to fetch recipe")
    return recipes


@router.get("/api/recipes/{recipe_id}", response_model=RecipeOut | HttpError)
def get_one_recipe(recipe_id: int, queries: RecipeQueries = Depends()):
    try:
        recipe = queries.get_one(recipe_id)
    except:
        raise HTTPException(status_code=400, detail="Unable to fetch recipe")
    return recipe


@router.delete("/api/recipes/{recipe_id}", response_model=DeleteResponse | HttpError)
def delete_one_recipe(
    recipe_id: int,
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    try:
        is_deleted = queries.delete(recipe_id)
    except:
        raise HTTPException(status_code=400, detail="Unable to delete the recipe")
    return is_deleted


@router.put("/api/recipes/{recipe_id}", response_model=RecipeOut | HttpError)
def update_recipe(
    recipe_id: int,
    info: RecipeIn,
    queries: RecipeQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.get_current_account_data),
):
    try:
        recipe = queries.update(recipe_id, info, account_data["id"])
    except:
        raise HTTPException(status_code=400, detail="Unable to update recipe")
    return recipe
