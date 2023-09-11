from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List, Optional


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


class AccountList(BaseModel):
    id: int
    username: str
    email: str
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
    prep_time: Optional[str]
    servings: Optional[int]
    picture_url: Optional[str]
    ingredients: List[str]
    directions: List[Direction]
    tags: List[str]


class RecipeOut(RecipeIn):
    id: int
    account_id: Optional[int]


class RecipeCardOut(BaseModel):
    id: int
    name: str
    prep_time: Optional[str]
    servings: Optional[int]
    picture_url: Optional[str]
    account_id: Optional[int]


class DeleteResponse(BaseModel):
    is_deleted: str
