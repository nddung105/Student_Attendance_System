from app.models.User import User, UserInDB
from app.repository.DBConnector import DBConnector

from app.utils.SubjectUtil import SubjectUtils
from app.utils.UserUtil import UserUtil
from typing import List


class UserRepo(DBConnector):
    def __init__(self, host: str, port: int, user: str, password: str, database_name=""):
        super().__init__(host, port, user, password, database_name=database_name)
        self.cursor = self.myDb.cursor(buffered=True)

    def get_by_id(self, id: int) -> UserInDB:
        query = f"Select * from {self.database_name}.user u where u.id = {id} and u.disabled != 1"
        print(query)
        self.cursor.execute(query)
        data = self.cursor.fetchone()
        if not data:
            raise Exception("User not found")
        return UserUtil.to_user(data)

    def get_by_username(self, username: str) -> UserInDB:
        query = f"Select * from {self.database_name}.user u where u.username = \"{username}\" and u.disabled != 1"
        print(query)
        self.cursor.execute(query)
        data = self.cursor.fetchone()
        if not data:
            raise Exception("User not found")
        return UserUtil.to_user(data)

    def get_all(self) -> list:
        query = f"Select * from {self.database_name}.user u where u.disabled != 1"
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        res = []
        for _data in data:
            res.append(UserUtil.to_user(_data))
        return res

    # def insert(self,kwargs):
    #     query = f"insert into {self.database_name}.user value ({kwargs})"
    #
    def get_all_subject(self, id: int) -> list:
        self.get_by_id(id)
        query = f"Select * from {self.database_name}.subject s where s.teacher_id = {id}"
        print(query)
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        res = []
        for _data in data:
            res.append(SubjectUtils.to_subject(_data))
        return res

    def save(self,username, email, fullname, local, hashed_password):
        query = f"INSERT INTO `attendancemanagementsys`.`user` (`username`, `email`, `fullname`, `local`, `hashed_password`, `disabled`) VALUES ('{username}', '{email}', '{fullname}', '{local}', '{hashed_password}', '0');"
        print(query)
        self.cursor.execute(query)
        self.myDb.commit()
        return self.get_by_username(username)
