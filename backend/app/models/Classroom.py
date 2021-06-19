from typing import Optional

from pydantic import BaseModel


class Classroom(BaseModel):
    id: Optional[int]
    alias: str
    description: Optional[str] = None

