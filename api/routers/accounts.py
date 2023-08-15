from fastapi import APIRouter, Depends, Request, Response
from models import AccountToken, AccountIn, AccountForm
from queries.accounts import AccountQueries
from authenticator import authenticator

router = APIRouter()


# , response_model=AccountToken
@router.post("/api/accounts")
async def create_account(info: AccountIn, request: Request, response: Response, queries: AccountQueries = Depends()):
    hashed_password = authenticator.hash_password(info.password)
    account = queries.create(info, hashed_password)
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())
