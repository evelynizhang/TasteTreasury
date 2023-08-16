from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


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
