from pickle import NONE
from PyQt5.QtCore import Qt, QSize, QTimer, QThread
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel, QPushButton, QLineEdit, QFormLayout, QHBoxLayout, QVBoxLayout
from PyQt5.QtGui import QPixmap, QImage
from PyQt5.QtGui import QIntValidator, QDoubleValidator, QFont
from face_recognition.webcam_infer import facenet_embed
from config import Settings
import requests
import numpy as np
import os


class StageRegisFace(QWidget):
    def __init__(self, main, h=640, w=480):
        super(StageRegisFace, self).__init__()
        self.main = main

        self.root_vbox = QVBoxLayout()
        self.root_vbox.setAlignment(Qt.AlignTop)
        self.setLayout(self.root_vbox)
        # self.setMinimumSize(QSize(640, 480))

        self.hbox = QHBoxLayout()

        self.label_regis = QLabel("ĐĂNG KÝ KHUÔN MẶT VÀO HỆ THỐNG")
        self.label_regis.setStyleSheet("border: 1px solid black;")
        self.label_regis.setAlignment(Qt.AlignCenter)
        self.label_regis.setFont(QFont('Arial', 30))

        self.root_vbox.addWidget(self.label_regis)
        self.root_vbox.addLayout(self.hbox)

        self.label = QLabel()
        self.label.setFixedSize(640, 480)

        self.hbox.addWidget(self.label)

        self.name = QLineEdit()
        self.name.setMaxLength(50)
        self.name.setAlignment(Qt.AlignLeft)
        self.name.setFont(QFont("Arial", 15))

        self.mssv = QLineEdit()
        self.mssv.setValidator(QIntValidator())
        self.mssv.setMaxLength(8)
        self.mssv.setAlignment(Qt.AlignLeft)
        self.mssv.setFont(QFont("Arial", 15))

        self.form = QFormLayout()
        self.form.setLabelAlignment(Qt.AlignLeft)

        self.form.addRow("Họ và tên", self.name)
        self.form.addRow("MSSV", self.mssv)

        self.label_noti = QLabel("Mời bạn nhập thông tin")
        self.label_noti.setAlignment(Qt.AlignCenter)
        self.label_noti.setStyleSheet("border: 1px solid black;")
        self.label_noti.setFont(QFont('Arial', 18))

        self.submit = QPushButton("Gửi đăng ký")
        self.start = QPushButton("Chụp ảnh")

        self.start.clicked.connect(self.capture)
        self.submit.clicked.connect(self.post_submit)

        self.layout_sub_start = QHBoxLayout()
        self.layout_sub_start.addWidget(self.start)
        self.layout_sub_start.addWidget(self.submit)

        self.button_face_reg = QPushButton("Điểm danh")
        self.button_face_reg.clicked.connect(lambda x: self.main.face_reg(2))
        self.button_exit = QPushButton('Thoát')
        self.button_exit.clicked.connect(self.action_exit)

        self.vbox = QVBoxLayout()
        self.vbox.setAlignment(Qt.AlignTop)
        self.vbox.addWidget(self.label_noti)
        self.vbox.addLayout(self.form)
        self.vbox.addLayout(self.layout_sub_start)
        self.vbox.addWidget(self.button_face_reg)
        self.vbox.addWidget(self.button_exit)

        self.hbox.addLayout(self.vbox)

        self.show_label = True

        self.faces = None

    def get_frame(self, pixmap):
        self.label.setPixmap(pixmap)

    def capture(self):
        self.show_label = not self.show_label

    def post_submit(self):
        name = self.name.text()
        mssv = self.mssv.text()
        if name and mssv and not self.show_label:
            print(name, mssv)
            self.name.setText('')
            self.mssv.setText('')
            self.show_label = not self.show_label
            embed = facenet_embed(self.main.frozen_model, self.faces[0])

            data = {
                "id": int(mssv),
                "fullname": name,
                "embedding": 'None'
            }
            result = requests.post(f'{Settings.api_url}/student',
                                   json=data, headers={'bearer-token': self.main.access_token})
            print(result.text)

            id_file = 'face_recognition/weights/id.txt'
            embed_file = 'face_recognition/weights/embed.npy'

            if os.path.isfile(id_file) and os.path.isfile(embed_file):
                with open(id_file, 'a') as f:
                    f.write('\n'+str(mssv)+'\t'+name)
                with open(embed_file, 'rb') as f:
                    a = np.load(f)
                x = np.concatenate((a, embed), axis=0)
                print(x.shape)
                with open(embed_file, 'wb') as f:
                    np.save(f, x)
            else:
                with open(id_file, 'w') as f:
                    f.write(str(mssv)+'\t'+name)
                with open(embed_file, 'wb') as f:
                    np.save(f, embed)

    def action_exit(self):
        # Hành động cho nút "Thoát
        self.close()
