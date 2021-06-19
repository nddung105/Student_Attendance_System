# Hệ thống điểm danh sinh viên

## 1. Giao diện Web
- Frontend được viết bằng Angular 9
- Yêu cầu trước khi chạy 
    - Cài đặt Node.js phiên bản 10.13 trở lên
    - Cài đặt Angular CLI
    ```bash
    sudo npm install -g @angular/cli
    ```

###  1.1 Cài đặt thư viện
```
$ cd frontend_angular
$ sudo npm install
```
###  1.2 Chạy chương trình
```
$ ng serve
```
###  1.3 Truy cập trên trình duyệt 
- http://localhost:4200

---

## 2. App điểm danh sinh viên
- Sử dụng Python 3.6, Tensorflow 1.14 và PyQt5
###  2.1 Cài đặt thư viện 
```
$ pip install -r requirements.txt
```
###  2.2 Downloads weights
- [Pre-trained FaceNet](https://drive.google.com/open?id=1R77HmFADxe87GmoLwzfgMu_HY0IhcyBz): giải nén và đưa vào thư mục "**face_recognition/frozen_facenet**".

 -  [MTCNN Weights](https://drive.google.com/file/d/16fnKUxtcqDVDnszm4YlwgIa5XyrnIbgG/view?usp=sharing):  đưa vào thư mục "**face_recognition/weights**". 

###  2.3 Chạy chương trình
```
$ cd app_face_recognition
$ python app.py
```