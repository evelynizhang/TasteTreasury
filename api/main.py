import os
from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, recipes, tags

app = FastAPI()
app.include_router(authenticator.router, tags=["Auth"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(recipes.router, tags=["Recipes"])
app.include_router(tags.router, tags=["Tags"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", None)],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
