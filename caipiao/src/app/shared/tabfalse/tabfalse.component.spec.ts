import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabfalseComponent } from './tabfalse.component';

describe('TabfalseComponent', () => {
  let component: TabfalseComponent;
  let fixture: ComponentFixture<TabfalseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabfalseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabfalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
