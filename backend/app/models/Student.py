from pydantic import BaseModel
from typing import Optional


class Student(BaseModel):
    id: int
    fullname: str
    embedding: str


class StudentInOut(BaseModel):
    id: int
    fullname: str
    time_in: Optional[str]
    time_out: Optional[str]
