from fastapi import APIRouter, Depends, Request, Response, HTTPException
from models import AccountToken, AccountIn, AccountForm, HttpError
from queries.accounts import AccountQueries, DuplicateAccountError
from authenticator import authenticator


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(info: AccountIn, request: Request, response: Response, queries: AccountQueries = Depends()):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = queries.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=400,
            detail="username/email are taken"
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())
