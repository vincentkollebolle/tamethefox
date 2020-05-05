import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatpanelComponent } from './chatpanel.component';

describe('ChatpanelComponent', () => {
  let component: ChatpanelComponent;
  let fixture: ComponentFixture<ChatpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
