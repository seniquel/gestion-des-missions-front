import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionModifComponent } from './mission-modif.component';

describe('MissionModifComponent', () => {
  let component: MissionModifComponent;
  let fixture: ComponentFixture<MissionModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
