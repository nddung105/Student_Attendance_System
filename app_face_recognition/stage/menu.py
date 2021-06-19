from PyQt5.QtCore import Qt, QSize, QTimer, QThread
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel, QPushButton, QLineEdit, QFormLayout, QHBoxLayout, QVBoxLayout
from PyQt5.QtGui import QPixmap, QImage
from PyQt5.QtGui import QIntValidator, QDoubleValidator, QFont


class StageBegin(QWidget):
    # Menu khi mở ứng dụng
    def __init__(self, main, h=400, w=240):
        super(StageBegin, self).__init__()
        self.main = main
        self.h = h
        self.w = w
        self.resize(self.h, self.w)

        # Khởi tạo nút, action và vị trí nút
        self.init_buttons()
        self.init_action_buttons()
        self.init_position_buttons()

    def init_buttons(self):
        # Khởi tạo nút
        self.button_registration_face = QPushButton('Đăng ký khuôn mặt', self)
        self.button_face_reg = QPushButton('Điểm danh', self)
        self.button_exit = QPushButton('Thoát', self)

    def init_position_buttons(self):
        # Khởi tạo vị trí cho các nút
        self.button_registration_face.setGeometry(50, 10, 300, 70)
        self.button_face_reg.setGeometry(50, 80, 300, 70)
        self.button_exit.setGeometry(50, 160, 300, 70)

    def init_action_buttons(self):
        # Hành động cho các nút
        self.button_exit.clicked.connect(self.action_exit)
        self.button_face_reg.clicked.connect(lambda x: self.main.face_reg(1))
        self.button_registration_face.clicked.connect(
            lambda x: self.main.regis_face(1))

    def action_exit(self):
        # Hành động cho nút "Thoát
        self.close()
