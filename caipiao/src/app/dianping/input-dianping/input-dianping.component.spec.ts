import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDianpingComponent } from './input-dianping.component';

describe('InputDianpingComponent', () => {
  let component: InputDianpingComponent;
  let fixture: ComponentFixture<InputDianpingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDianpingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDianpingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
