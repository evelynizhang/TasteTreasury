from psycopg_pool import ConnectionPool
import os
from pydantic import BaseModel
from models import AccountIn, AccountOut

# pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])


class AccountsRepo:
    pass

class AccountQueries:
    def create(self, info: AccountIn):
         pass
    # def get(self, email: str) -> AccountOut:
    #     pass
    # def create(self, info: AccountIn, hashed_password: str ) -> AccountOut:
    #     pass
