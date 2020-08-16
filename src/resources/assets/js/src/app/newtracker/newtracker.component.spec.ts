import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrackerComponent } from './newtracker.component';

describe('ImageComponent', () => {
  let component: NewTrackerComponent;
  let fixture: ComponentFixture<NewTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
