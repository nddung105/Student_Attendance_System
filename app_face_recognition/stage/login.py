from PyQt5.QtCore import Qt, QSize, QTimer, QThread
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel, QPushButton, QLineEdit, QFormLayout, QHBoxLayout, QVBoxLayout
from PyQt5.QtGui import QPixmap, QImage
from PyQt5.QtGui import QIntValidator, QDoubleValidator, QFont


class StageLogin(QWidget):
    # Menu khi mở ứng dụng
    def __init__(self, main, h=400, w=150):
        super(StageLogin, self).__init__()
        self.main = main
        self.h = h
        self.w = w
        self.resize(self.h, self.w)

        # Khởi tạo nút, action và vị trí nút
        self.init_buttons()
        self.init_action_buttons()
        self.init_position_buttons()
        self.init_form()

    def init_buttons(self):
        # Khởi tạo nút
        self.button_login = QPushButton('Đăng nhập', self)
        self.button_exit = QPushButton('Thoát', self)

    def init_position_buttons(self):
        # Khởi tạo vị trí cho các nút
        self.button_login.setGeometry(90, 100, 100, 30)
        self.button_exit.setGeometry(210, 100, 100, 30)

    def init_form(self):

        self.name = QLineEdit()
        self.name.setMaxLength(50)
        self.name.setAlignment(Qt.AlignLeft)
        self.name.setFont(QFont("Arial", 15))

        self.password = QLineEdit()
        self.password.setMaxLength(50)
        self.password.setAlignment(Qt.AlignLeft)
        self.password.setFont(QFont("Arial", 15))

        self.form = QFormLayout()
        self.form.setLabelAlignment(Qt.AlignLeft)

        self.form.addRow("Username", self.name)
        self.form.addRow("Password", self.password)

        self.vbox = QVBoxLayout()
        self.vbox.setAlignment(Qt.AlignTop)
        self.vbox.addLayout(self.form)

        self.setLayout(self.vbox)

    def init_action_buttons(self):
        # Hành động cho các nút
        self.button_exit.clicked.connect(self.action_exit)
        self.button_login.clicked.connect(
            lambda x: self.main.login())

    def action_exit(self):
        # Hành động cho nút "Thoát
        self.close()
