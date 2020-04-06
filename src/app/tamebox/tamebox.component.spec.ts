import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TameboxComponent } from './tamebox.component';

describe('TameboxComponent', () => {
  let component: TameboxComponent;
  let fixture: ComponentFixture<TameboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TameboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TameboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
