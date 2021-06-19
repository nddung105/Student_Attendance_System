from typing import Optional

from pydantic import BaseModel


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[int] = 0
    local: Optional[int] = 0


class UserInDB(User):
    id: Optional[int]
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    local: Optional[int] = 0
    password: str
