from fastapi import APIRouter, Depends, HTTPException
from models import HttpError
from typing import List
from queries.tags import TagsQueries

router = APIRouter()


@router.get("/api/tags", response_model=List[str] | HttpError)
def get_tags(queries: TagsQueries = Depends()):
    try:
        tags = queries.get_tags()
    except HttpError:
        raise HTTPException(status_code=400, detail="Unable to fetch tags")
    return tags
