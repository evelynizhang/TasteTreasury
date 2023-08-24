from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List


class DuplicateAccountError(ValueError):
    pass


class AccountForm(BaseModel):
    username: str
    password: str


class AccountIn(BaseModel):
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str


class AccountOutHashedPassword(AccountOut):
    hashed_password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


class Direction(BaseModel):
    step_number: int
    recipe_step: str


class RecipeIn(BaseModel):
    name: str
    prep_time: str
    servings: int
    picture_url: str
    ingredients: List[str]
    directions: List[Direction]
    tags: List[str]


class RecipeOut(BaseModel):
    id: int
    name: str
    prep_time: str
    servings: int
    picture_url: str
    account_id: int
    ingredients: List[str]
    directions: List[Direction]
    tags: List[str]


class RecipeCardOut(BaseModel):
    id: int
    name: str
    prep_time: str
    servings: int
    picture_url: str


class DeleteResponse(BaseModel):
    is_deleted: str
