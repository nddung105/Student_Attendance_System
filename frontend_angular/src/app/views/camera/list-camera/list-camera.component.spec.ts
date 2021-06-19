import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCameraComponent } from './list-camera.component';

describe('ListCameraComponent', () => {
  let component: ListCameraComponent;
  let fixture: ComponentFixture<ListCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
