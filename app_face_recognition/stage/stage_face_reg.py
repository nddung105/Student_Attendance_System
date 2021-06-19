from PyQt5.QtCore import Qt, QSize, QTimer, QThread
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel, QPushButton, QLineEdit, QFormLayout, QHBoxLayout, QVBoxLayout, QListWidget, QListWidgetItem
from PyQt5.QtGui import QPixmap, QImage
from PyQt5.QtGui import QIntValidator, QDoubleValidator, QFont

from face_recognition.webcam_infer import facenet_embed
from config import Settings
import requests
import numpy as np
import os

from sklearn.metrics.pairwise import cosine_similarity

from datetime import datetime


class StageFaceReg(QWidget):
    def __init__(self, main, h=640, w=480):
        super(StageFaceReg, self).__init__()
        self.main = main

        self.root_vbox = QVBoxLayout()
        self.root_vbox.setAlignment(Qt.AlignTop)
        self.setLayout(self.root_vbox)
        # self.setMinimumSize(QSize(640, 480))

        self.hbox = QHBoxLayout()

        self.label_regis = QLabel("ĐIỂM DANH BUỔI HỌC")
        self.label_regis.setStyleSheet("border: 1px solid black;")
        self.label_regis.setAlignment(Qt.AlignCenter)
        self.label_regis.setFont(QFont('Arial', 30))

        self.root_vbox.addWidget(self.label_regis)
        self.root_vbox.addLayout(self.hbox)

        self.label = QLabel()
        self.label.setFixedSize(640, 480)

        self.hbox.addWidget(self.label)

        self.list_reg = QListWidget()

        self.label_noti = QLabel("Sinh viên đã điểm danh")
        self.label_noti.setAlignment(Qt.AlignCenter)
        self.label_noti.setStyleSheet("border: 1px solid black;")
        self.label_noti.setFont(QFont('Arial', 18))

        self.button_registration_face = QPushButton("Đăng ký khuôn mặt")
        self.button_registration_face.clicked.connect(
            lambda x: self.main.regis_face(2))
        self.button_exit = QPushButton('Thoát')
        self.button_exit.clicked.connect(self.action_exit)

        self.vbox = QVBoxLayout()
        self.vbox.setAlignment(Qt.AlignTop)
        self.vbox.addWidget(self.label_noti)
        self.vbox.addWidget(self.list_reg)
        self.vbox.addWidget(self.button_registration_face)
        self.vbox.addWidget(self.button_exit)

        self.hbox.addLayout(self.vbox)

        self.faces = None
        self.isfile = 0

        id_file = 'face_recognition/weights/id.txt'
        embed_file = 'face_recognition/weights/embed.npy'

        if os.path.isfile(id_file) and os.path.isfile(embed_file):
            with open(id_file, 'r') as f:
                self.data = f.read().split('\n')
            with open(embed_file, 'rb') as f:
                self.embeds = np.load(f)
            self.isfile = 1

        self.timer = QTimer()
        self.timer.timeout.connect(self.run_timer)
        self.timer.start(1000. / 24)

    def get_frame(self, pixmap):
        self.label.setPixmap(pixmap)

    def action_exit(self):
        # Hành động cho nút "Thoát
        self.close()

    def list_add_student(self, student):
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        content = f"--- {dt_string} ---\n    {student}"

        self.list_reg.addItem(QListWidgetItem(content))

    def run_timer(self):
        if self.faces and self.isfile:
            embed = facenet_embed(self.main.frozen_model, self.faces[0])
            result = cosine_similarity(embed, self.embeds)
            argmax = np.argmax(result, axis=1)[0]
            if result[0][argmax] > 0.5:
                process_data = self.data[argmax].split('\t')
                id_ = int(process_data[0])
                result = requests.post(f'{Settings.api_url}/student_in?classroom_id=1&student_id={id_}', headers={
                                       'bearer-token': self.main.access_token})
                print(result.text)
                self.list_add_student(self.data[argmax])
