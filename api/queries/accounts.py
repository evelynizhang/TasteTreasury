from pydantic import BaseModel
from models import AccountIn, AccountOut


class AccountQueries(Queries):

    def get(self, email: str) -> AccountOut:

    def create(self, info: AccountIn, hashed_password: str ) -> AccountOut:
