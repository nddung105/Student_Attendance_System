from app.models.Subject import Subject


class SubjectUtils:
    @staticmethod
    def to_subject(data:list) -> Subject:
        subj = Subject(name=data[1], teacher_id=data[2],
                       classroom_id=data[3])
        subj.id = data[0]
        subj.description = data[4]
        return subj
