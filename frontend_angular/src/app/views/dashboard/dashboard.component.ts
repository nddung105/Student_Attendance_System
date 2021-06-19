import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CameraService } from '../../services/camera.service';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Object> = new Subject();
  dtTriggerLesson: Subject<Object> = new Subject();
  dtTriggerAttendance: Subject<Object> = new Subject();
  public subjects: Subjects[] = [];
  public lessons: Lessons[] = [];
  public attendances: Attendances[] = [];
  public isShowLesson: boolean = false;
  public isShowAttendance: boolean = false;
  public isShowSubject: boolean = true;
  constructor(private httpService: HttpService,
    private cameraService: CameraService) { }
  ngOnInit(): void {
    if (window.innerWidth < 1280) {
      this.dtOptions = {
        scrollX: true,
        pageLength: 10
      };
    }
    else {
      this.dtOptions = {
        pageLength: 10
      };
    }
    this.cameraService.getCameras()
      .subscribe(data => {
        if (data) {
          this.subjects = data;
          console.log(data)
          this.dtTrigger.next();
        }
      });
  }
  onSubmit(id, option) {
    if (option === 0){
      this.dtTriggerLesson = new Subject();
      this.cameraService.getLesson(id)
        .subscribe(data => {
          if (data) {
            this.lessons = data;
            console.log(data)
            this.dtTriggerLesson.next();
          }
        });
      this.isShowSubject = false;
      this.isShowAttendance = false;
      this.isShowLesson = true;
    }
    else{
      this.dtTriggerAttendance = new Subject();
      this.cameraService.getAttendance(id)
        .subscribe(data => {
          if (data) {
            this.attendances = data;
            console.log(data)
            this.dtTriggerAttendance.next();
          }
        });
      this.isShowSubject = false;
      this.isShowAttendance = true;
      this.isShowLesson = false;
    }
  }
  onBack(option) {
    if (option ===0){
      this.dtTrigger = new Subject();
      this.cameraService.getCameras()
        .subscribe(data => {
          if (data) {
            this.subjects = data;
            console.log(data)
            this.dtTrigger.next();
          }
        });
      this.isShowSubject = true;
      this.isShowLesson = false;
      this.isShowAttendance = false;
    }
    else{
    }
  }
}

export interface Subjects {
  id: Number;
  name: string;
  description: string;
  teacher_id: Number;
  classroom_id: Number;
}

export interface Lessons {
  id: Number;
  name: string;
  start_time: string;
  end_time: string;
  classroom_id: Number;
}

export interface Attendances {
  id: Number;
  fullname: string;
  time_in: string;
  time_out: string;
}
