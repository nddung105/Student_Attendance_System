import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ModalDirective } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild("pdByPictureModal") public pdByPictureModal: ModalDirective;
  public update: UpdateRequestData = {
    password: ""
  };
  public pdByPicResponseData: Object = null;
  public message: any;
  public error: any
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const data: UpdateRequestData = {
      password: this.update.password
    };
    this.pdByPicResponseData = null;
    this.error = null;
    this.httpService.post<any>('/checkUpdate', data)
      .subscribe(response => {
        console.log(response);

        if (response[0].result === 'Fail') {
          this.message = response[0].message;
          this.error = "Sai mật khẩu!"
        }
        else {
          if (response[0].message !== 'Success') {
            this.message = "Kết quả";
            this.error = "Không có bản cập nhật mới!"
          }
          else {
            this.message = "Có bản cập nhật mới!";
            this.pdByPicResponseData = response[0];
          }
        }
        this.pdByPictureModal.show();
      });
  }

  installUpdate() {
    const data: UpdateRequestData = {
      password: this.update.password
    };
    this.httpService.post<any>('/installUpdate', data)
      .subscribe(response => {
        console.log("Đang cài đặt bản cập nhật! Hệ thống sẽ tự khởi động lại");
      });
    this.pdByPictureModal.hide()
  }
}
export interface UpdateRequestData {
  password: string;
}