import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { CameraService } from '../../../services/camera.service';


@Component({
  selector: 'app-list-camera',
  templateUrl: './list-camera.component.html',
  styleUrls: ['./list-camera.component.css']
})
export class ListCameraComponent implements OnInit, OnDestroy {
  @ViewChild('editCameraModal') public editCameraModal: ModalDirective;
  @ViewChild('deleteCameraModal') public deleteCameraModal: ModalDirective;
  @ViewChild('addCameraModal') public addCameraModal: ModalDirective;
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  public cameras: Camera[] = [];
  public editedCamera: Camera = {
    name: '',
    rstp_link: '',
    status: 0
  };
  public addedCamera: Camera = {
    name: '',
    rstp_link: '',
    status: 1
  };

  public deleledCameraID: string;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Object> = new Subject();

  // alert
  public alerts: any[] = [];
  onClosedAlert(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
  constructor(private httpService: HttpService,
    private cameraService: CameraService
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 1280){
      this.dtOptions = {
        scrollX: true,
        pageLength: 10
      };
    }
    else{
      this.dtOptions = {
        pageLength: 10
      };
    }
      
    this.cameraService.getCameras()
      .subscribe(data => {
        if (data[1] === 200) {
          this.cameras = data[0].result;
          this.dtTrigger.next();
        }
      });
  }

  getCameras(): void {
    this.cameraService.getCameras()
      .subscribe(data => {
        if (data[1] === 200) {
          this.cameras = data[0].result;
          // this.dtTrigger.next();
        }
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  editRow(camera: Camera) {
    this.editedCamera = {
      name: camera.name,
      rstp_link: camera.rstp_link,
      status: camera.status,
    };
    this.editCameraModal.show();
  }
  editCamera() {
    this.editCameraModal.hide();
    const data: Object = {
      'CameraID': this.editedCamera.name,
      'rstp_link': this.editedCamera.rstp_link,
      'status': this.editedCamera.status
    };

    this.httpService.post<Object>('/editCamera', data)
      .subscribe(response => {
        if (response[1] === 200 && response[0].result === 'Success') {
          this.alerts.push({
            type: 'success',
            msg: response[0].message,
            timeout: 7000
          });
          // this.dtTrigger.next();
          this.getCameras();
        } else {
          this.alerts.push({
            type: 'danger',
            msg: response[0].message,
            timeout: 7000
          });
        }
      });
  }

  deleteRow(camera: Camera) {
    this.deleledCameraID = camera.name;
    this.deleteCameraModal.show();
  }
  deleteCamera() {
    this.deleteCameraModal.hide();
    const data: Object = {
      'CameraID': this.deleledCameraID
    };
    this.httpService.post<Object>('/deleteCamera', data)
      .subscribe(response => {
        if (response[1] === 200 && response[0].result === 'Success') {
          this.alerts.push({
            type: 'success',
            msg: response[0].message,
            timeout: 7000
          });
          this.getCameras();
        } else {
          this.alerts.push({
            type: 'danger',
            msg: response[0].message,
            timeout: 7000
          });
        }
      });
  }
  addRow() {
    this.addedCamera = {
      name: '',
      rstp_link: '',
      status: 1,
    };
    this.addCameraModal.show();
  }
  addCamera() {
    this.addCameraModal.hide();
    const data: Object = {
      'CameraID': this.addedCamera.name,
      'rstp_link': this.addedCamera.rstp_link,
      'status': this.addedCamera.status
    };

    this.httpService.post<Object>('/addCamera', data)
      .subscribe(response => {
        if (response[1] === 200 && response[0].result === 'Success') {
          this.alerts.push({
            type: 'success',
            msg: response[0].message,
            timeout: 7000
          });
          // this.dtTrigger.next();
          this.getCameras();
        } else {
          this.alerts.push({
            type: 'danger',
            msg: response[0].message,
            timeout: 7000
          });
        }
      });
  }
  testCamera(camera: Camera) {
    const data: Object = {
      'CameraID': camera.name
    };
    // tslint:disable-next-line:prefer-const
    let alert: any = {
      type: 'info',
      msg: '<div class="spinner-border spinner-border-sm">\n' +
        '</div> Đang check Camera: ' + camera.name,
      timeout: 12000
    };
    this.alerts.push(alert);
    this.alerts.push();
    this.httpService.post<Object>('/testCamera', data)
      .subscribe(response => {
        if (response[1] === 200 && response[0].result === 'Success') {
          alert.msg = response[0].message;

          alert.type = 'success';
          // this.getCameras();
        } else {
          alert.msg = response[0].message;

          alert.type = 'danger';
        }
      });
  }
}
export interface Camera {
  name: string;
  status: Number;
  rstp_link: string;
}
