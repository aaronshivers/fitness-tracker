import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopExercisingComponent } from './stop-exercising.component';

describe('StopTrainingComponent', () => {
  let component: StopExercisingComponent;
  let fixture: ComponentFixture<StopExercisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopExercisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopExercisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
