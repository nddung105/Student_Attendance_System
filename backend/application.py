from datetime import datetime, timedelta

import yaml
from fastapi import Depends, FastAPI, HTTPException, status, Request, Header
from fastapi.security import OAuth2PasswordRequestForm

from app.models.Token import Token
from app.models.User import UserInDB, User,UserCreate
from app.models.Student import Student
from app.service.AuthService import AuthService
from app.service.UserService import UserService
from app.service.StudentService import StudentService
from typing import Optional

with open("resources/config.yml", '+r') as config:
    cfg = yaml.load(config, Loader=yaml.FullLoader)

app = FastAPI()


@app.post("/token")
async def login_for_access_token(username: str, userpass: str):
    auth_service = AuthService()
    return auth_service.authenticate_user(username, userpass)


@app.post("/user/new")
async def create_new_account(user: UserCreate):
    auth_service = AuthService()
    user = (auth_service.create(user))
    user.hashed_password = "hashed by jwt"
    return user


@app.get("/users/me/", response_model=UserInDB)
async def read_users_me(bearer_token: Optional[str] = Header(None)):
    auth_service = AuthService()
    user = auth_service.get_current_user(bearer_token)
    print(user)
    user.hashed_password = "hashed by jwt"
    return user


@app.get("/subjects")
async def get_subjects(current_user: UserInDB = Depends(read_users_me)):
    user_service = UserService()
    return user_service.get_all_subjects(current_user.id)


@app.get("/subject/{subject_id}")
async def get_shifts(subject_id,current_user: UserInDB = Depends(read_users_me)):
    user_service = UserService()
    return user_service.get_all_shifts(subject_id)


@app.post("/student")
async def new_student(student: Student,current_user: UserInDB = Depends(read_users_me)):
    student_service = StudentService()
    return student_service.create(student)


@app.post("/student_in")
async def attend(classroom_id: int,student_id: int,current_user: UserInDB = Depends(read_users_me)):
    student_service = StudentService()
    return student_service.student_in(classroom_id, student_id)

@app.get("/get-attendance")
async def get_attend(shift_id: int,current_user: UserInDB = Depends(read_users_me)):
    user_service = UserService()
    return user_service.get_student_in_out(shift_id)
