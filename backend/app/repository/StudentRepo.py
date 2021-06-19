from mysql.connector.errors import IntegrityError
from app.repository.DBConnector import DBConnector
from app.utils.ShiftUtil import ShiftUtil


class StudentRepo(DBConnector):

    def __init__(self, host: str, port: int, user: str, password: str, database_name=""):
        super().__init__(host, port, user, password, database_name=database_name)
        self.cursor = self.myDb.cursor(buffered=True)

    def save(self, id, fullname, embedding):

        try:
            query = f"INSERT INTO `attendancemanagementsys`.`student` (`id`, `fullname`, `embedding`) VALUES ('{id}', '{fullname}', '{embedding}'); "
            print(query)
            self.cursor.execute(query)
        except IntegrityError as e:
            query = f"UPDATE `attendancemanagementsys`.`student` SET `fullname` = '{fullname}', `embedding` = '{embedding}' WHERE (`id` = '{id}');"
            print(query)
            self.cursor.execute(query)

        self.myDb.commit()
        return "Successful"

    def get_shift(self, classroom_id, time):
        query = f"Select * from shift s where s.classroom_id = {classroom_id} and s.start_time <= \"{time}\" and  s.end_time >= \"{time}\";"
        print(query)
        self.cursor.execute(query)
        data = self.cursor.fetchone()
        if not data:
            raise Exception("shift not found")
        return ShiftUtil.to_shift(data)

    def student_in(self, student_id, shift_id, time_in):
        query = f"INSERT INTO student_shift (`student_id`, `shift_id`, `time_in`) VALUES ('{student_id}', '{shift_id}', '{time_in}'); "
        print(query)
        self.cursor.execute(query)
        self.myDb.commit()
        return "Successful"

    def student_out(self, student_id, shift_id, time_out):
        query = f"INSERT INTO student_shift (`student_id`, `shift_id`, `time_out`) VALUES ('{student_id}', '{shift_id}', '{time_out}'); "
        print(query)
        self.cursor.execute(query)
        self.myDb.commit()
        return "Successful"
