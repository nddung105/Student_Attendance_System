from app.models.Shift import Shift
from app.utils.TimeUtil import TimeUtil


class ShiftUtil:

    @staticmethod
    def to_shift(data: list) -> Shift:
        subj = Shift(id=data[0], classroom_id=data[3], subject_id=data[4],
                     start_time=TimeUtil.to_str(data[1]), end_time=TimeUtil.to_str(data[2]))
        return subj


if __name__ == "__main__":
    print(1)
