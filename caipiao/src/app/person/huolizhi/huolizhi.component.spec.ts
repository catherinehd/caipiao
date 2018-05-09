import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuolizhiComponent } from './huolizhi.component';

describe('HuolizhiComponent', () => {
  let component: HuolizhiComponent;
  let fixture: ComponentFixture<HuolizhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuolizhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuolizhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
