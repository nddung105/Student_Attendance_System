from datetime import datetime


class TimeUtil:
    @staticmethod
    def to_str(time: datetime) -> str:
        return time.strftime("%Y-%m-%d %H:%M:%S")
