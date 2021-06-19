from app.repository.DBConnector import DBConnector
from app.utils.ShiftUtil import ShiftUtil
from app.utils.UserUtil import UserUtil


class SubjectRepo(DBConnector):

    def __init__(self, host: str, port: int, user: str, password: str, database_name=""):
        super().__init__(host, port, user, password, database_name=database_name)
        self.cursor = self.myDb.cursor(buffered=True)

    def get_all_shift(self, subject_id: int) -> list:
        query = f"Select * from {self.database_name}.shift s where s.subject_id = {subject_id}"
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        print(data)
        res = []
        for _data in data:
            res.append(ShiftUtil.to_shift(_data))
        return res

    def get_student_in_out(self, shift_id) -> list:
        query = f"SELECT s.id, s.fullname, ss.time_in, ss.time_out FROM student s, student_shift ss where  ss.shift_id = {shift_id} and s.id = ss.student_id;"
        print(query)
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        print(data)
        res = []
        for _data in data:
            res.append(UserUtil.to_student_inout(_data))
        return res


if __name__ == "__main__":
    import time

    import yaml

    with open("../../resources/config.yml", '+r') as config:
        cfg = yaml.load(config, Loader=yaml.FullLoader)

    db_config = cfg['database']
    print(*db_config.values())

    subjectConnector = SubjectRepo(*db_config.values())
    u = subjectConnector.get_student_in_out(1)
    print(u)
    # u.id = None

    # print(u.__dict__)
