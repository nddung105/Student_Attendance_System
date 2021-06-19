from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.repository.UserRepo import UserRepo
from app.utils.JwtUtils import verify_password, get_current_username, create_access_token, get_password_hash
from fastapi import HTTPException
from datetime import datetime, timedelta
from app.models.User import UserInDB, User, UserCreate

import yaml


class AuthService:
    ACCESS_TOKEN_EXPIRE_MINUTES = None

    def __init__(self):
        with open("resources/config.yml", '+r') as config:
            cfg = yaml.load(config, Loader=yaml.FullLoader)
        db_config = cfg['database']
        self.user_repo = UserRepo(*db_config.values())
        self.ACCESS_TOKEN_EXPIRE_MINUTES = cfg['security']['ACCESS_TOKEN_EXPIRE_MINUTES']

    def create(self, user: UserCreate):
        try:
            self.user_repo.get_by_username(user.username)
            raise Exception("Already exists")
        except:
            hashed_pass = get_password_hash(user.password)
            print(hashed_pass)
            print(f"Creating new user{user}")
            user.password = hashed_pass
        return self.user_repo.save(*user.__dict__.values())

    def authenticate_user(self, username: str, password: str):
        try:
            user = self.user_repo.get_by_username(username)
        except Exception as e:
            print(e)
            return False

        if not verify_password(password, user.hashed_password):
            return False

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    def get_current_user(self, token: str) -> UserInDB:
        username = get_current_username(token)

        try:
            user = self.user_repo.get_by_username(username)
        except:
            return False
        if user is None:
            raise credentials_exception
        return user
