import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjjpickerComponent } from './gjjpicker.component';

describe('GjjpickerComponent', () => {
  let component: GjjpickerComponent;
  let fixture: ComponentFixture<GjjpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjjpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjjpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
