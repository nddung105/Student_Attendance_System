from app.repository.UserRepo import UserRepo
from app.repository.SubjectRepo import SubjectRepo
import yaml


class UserService:
    def __init__(self):
        with open("resources/config.yml", '+r') as config:
            cfg = yaml.load(config, Loader=yaml.FullLoader)
        db_config = cfg['database']
        self.user_repo = UserRepo(*db_config.values())
        self.subject_repo = SubjectRepo(*db_config.values())

    def get_all_subjects(self, teacher_id: int):
        res = []
        temp = self.user_repo.get_all_subject(teacher_id)
        for i in temp:
            res.append(i.__dict__)
        return res

    def get_all_shifts(self, subject_id: int):
        res = []
        temp = self.subject_repo.get_all_shift(subject_id)
        for i in temp:
            res.append(i.__dict__)
        return res

    def get_student_in_out(self, shift_id: int):
        res = []
        temp = self.subject_repo.get_student_in_out(shift_id)
        for i in temp:
            res.append(i.__dict__)
        return res
