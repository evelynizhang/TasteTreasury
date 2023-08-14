from pydantic import BaseModel

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    email: str
    password: str
    username: str

class AccountOutHashedPassword(BaseModel):
    id: int
    username: str
    hashed_password: str
class AccountOut (BaseModel):
    id: int
    username: str
