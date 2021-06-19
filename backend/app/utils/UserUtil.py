from app.models.User import UserInDB
from app.models.Student import StudentInOut
from pydantic import BaseModel
from app.utils.TimeUtil import TimeUtil


class UserUtil:
    @staticmethod
    def to_user(kwargs) -> UserInDB:
        user = UserInDB(username=kwargs[1],hashed_password=kwargs[6])
        user.id = kwargs[0]
        user.email = kwargs[2]
        user.full_name = kwargs[3]
        user.disabled = kwargs[4]
        user.local = kwargs[5]
        return user


    @staticmethod
    def to_student_inout(data) -> StudentInOut:
        print(data)
        s = StudentInOut(id=data[0], fullname=data[1], time_in=TimeUtil.to_str(data[2]))
        return s