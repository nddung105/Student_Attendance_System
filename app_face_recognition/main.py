from PyQt5.QtCore import Qt, QSize, QTimer, QThread
from PyQt5.QtWidgets import QApplication, QWidget, QGridLayout, QLabel, QPushButton, QLineEdit, QFormLayout, QHBoxLayout, QVBoxLayout, QMessageBox
from PyQt5.QtGui import QPixmap, QImage
from PyQt5.QtGui import QIntValidator, QDoubleValidator, QFont

import cv2
import requests

from stage.stage_face_reg import StageFaceReg
from stage.menu import StageBegin
from stage.login import StageLogin
from stage.stage_regis_face import StageRegisFace
from config import Settings

from face_recognition.mtcnn.detect_face import MTCNN
from face_recognition.webcam_infer import cut_face


class Main():
    def __init__(self):
        super(Main, self).__init__()
        self.app = QApplication([])

        self.frozen_model = 'face_recognition/frozen_facenet/20180408-102900/20180408-102900.pb'
        self.mtcnn_model = 'face_recognition/weights/mtcnn_weights.npy'

        self.detector = MTCNN(self.mtcnn_model)

        # Khởi tạo, hiện thị Menu
        self.stage_login = StageLogin(self)
        self.stage_login.show()

        self.access_token = ''

        self.stage_begin = StageBegin(self)
        # self.stage_begin.show()

        # Khởi tạo điểm danh
        self.stage_face_reg = StageFaceReg(self)

        # Mở camera
        self.init_video_cap()
        self.stage = 0

        # Vòng lặp thực hiện chức năng đọc camrera và gửi cho 2 stage
        self.timer = QTimer()
        self.timer.timeout.connect(self.read_camera)
        self.timer.start(1000. / 24)

    def app_exe(self):
        # Đóng ứng dụng
        self.app.exit(self.app.exec_())

    def init_video_cap(self):
        # Khởi tạo và mở camera
        self.vc = cv2.VideoCapture(0)
        self.vc.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.vc.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    def read_camera(self):
        # Đọc frame từ cam
        rval, frame = self.vc.read()
        if rval:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            faces, bboxs = cut_face(frame, self.detector)
            if faces:
                for i in range(len(faces)):
                    bounding_box = bboxs[i]
                    cv2.rectangle(frame, (bounding_box[0], bounding_box[1]),
                                  (bounding_box[2], bounding_box[3]),
                                  (0, 155, 255), 2)
            if self.stage == 1:
                # Stage điểm danh
                image = QImage(
                    frame, frame.shape[1], frame.shape[0], QImage.Format_RGB888)
                pixmap = QPixmap.fromImage(image)
                self.stage_face_reg.get_frame(pixmap)
                self.stage_face_reg.faces = faces
            elif self.stage == 2:
                # Stage đăng ký
                if self.stage_regis_face.show_label:
                    image = QImage(
                        frame, frame.shape[1], frame.shape[0], QImage.Format_RGB888)
                    pixmap = QPixmap.fromImage(image)
                    self.stage_regis_face.get_frame(pixmap)
                    self.stage_regis_face.faces = faces

    def face_reg(self, stage):
        # Hiển thị stage nhận diện
        if stage == 1:
            # Nếu đang ở Menu
            self.stage_begin.hide()
        elif stage == 2:
            # Nếu đang ở stage đăng ký
            self.stage_regis_face.hide()
        self.stage_face_reg.show()
        self.stage = 1

    def regis_face(self, stage):
        # Hiển thị stage đăng ký
        if stage == 1:
            # Nếu đang ở Menu
            self.stage_begin.hide()
        elif stage == 2:
            # Nếu đang ở stage nhận diện
            self.stage_face_reg.hide()
        self.stage_regis_face = StageRegisFace(self)
        self.stage_regis_face.show()
        self.stage = 2

    def login(self):
        username = self.stage_login.name.text()
        password = self.stage_login.password.text()
        result = requests.post(
            f'{Settings.api_url}/token?username={username}&userpass={password}')
        if (result.status_code == 200):
            if result.json():
                result = result.json()
                if result.get('access_token'):
                    self.access_token = result.get('access_token')
                    self.stage_login.hide()
                    self.stage_begin.show()
            else:
                QMessageBox.about(self.stage_login,
                                  "Thông báo", "Tài khoản không đúng")
