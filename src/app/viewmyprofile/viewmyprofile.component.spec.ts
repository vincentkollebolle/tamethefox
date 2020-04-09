import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmyprofileComponent } from './viewmyprofile.component';

describe('ViewmyprofileComponent', () => {
  let component: ViewmyprofileComponent;
  let fixture: ComponentFixture<ViewmyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
