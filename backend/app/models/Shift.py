from datetime import datetime

from pydantic import BaseModel
from typing import Optional


class Shift(BaseModel):
    id: Optional[int] = None
    classroom_id: int
    subject_id: int
    start_time: str
    end_time: str
