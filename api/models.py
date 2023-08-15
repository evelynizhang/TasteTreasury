from pydantic import BaseModel
from typing import List
from jwtdown_fastapi.authentication import Token


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    username: str
    password: str

class AccountOut (BaseModel):
    id: int
    username: str

class AccountOutHashedPassword(AccountOut):
    hashed_password: str

class AccountToken(Token):
    account:AccountOut
