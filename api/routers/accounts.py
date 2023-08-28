from fastapi import APIRouter, Depends, Request, Response, HTTPException
from jwtdown_fastapi.authentication import Token
from models import (
    AccountToken,
    AccountIn,
    AccountForm,
    HttpError,
    AccountOut,
    AccountList,
)
from queries.accounts import AccountQueries, DuplicateAccountError
from authenticator import authenticator
from typing import List


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    queries: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = queries.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(status_code=400, detail="username/email are taken")
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts", response_model=List[AccountList] | HttpError)
async def get_all_accounts(queries: AccountQueries = Depends()):
    accounts = queries.get_all()
    return accounts


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
