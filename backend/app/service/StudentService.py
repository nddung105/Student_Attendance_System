from app.repository.SubjectRepo import SubjectRepo
from app.repository.StudentRepo import StudentRepo
from datetime import datetime
from app.utils.TimeUtil import TimeUtil
from app.models.User import User
from app.models.Student import Student
import yaml

class StudentService:
    def __init__(self):
        with open("resources/config.yml", '+r') as config:
            cfg = yaml.load(config, Loader=yaml.FullLoader)
        db_config = cfg['database']
        self.subject_repo = SubjectRepo(*db_config.values())
        self.student_repo = StudentRepo(*db_config.values())

    def get_all_shifts(self, shift_id: int):
        return self.subject_repo.get_all_shift(shift_id)

    def student_in(self, classroom_id: int, student_id: int):
        current = TimeUtil.to_str(datetime.now())
        shift = self.student_repo.get_shift(classroom_id, current)
        self.student_repo.student_in(student_id,shift.id, current)
        return "successful"

    # def student_in(self, classroom_id: int, student_id: int):
    #     current = TimeUtil.to_str(datetime.now())
    #     shift = self.student_repo.get_shift(classroom_id, student_id)

    def create(self, student: Student):
        return self.student_repo.save(*student.__dict__.values())


