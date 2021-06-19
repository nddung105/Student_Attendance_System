from typing import Optional

from pydantic import BaseModel


class Subject(BaseModel):
    id: Optional[int]
    name: str
    teacher_id: int
    description: Optional[str] = None
    classroom_id: int
