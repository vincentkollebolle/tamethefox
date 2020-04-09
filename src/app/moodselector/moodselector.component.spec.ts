import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodselectorComponent } from './moodselector.component';

describe('MoodselectorComponent', () => {
  let component: MoodselectorComponent;
  let fixture: ComponentFixture<MoodselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
