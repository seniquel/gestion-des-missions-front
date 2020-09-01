import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDemandeComponent } from './mission-demande.component';

describe('MissionDemandeComponent', () => {
  let component: MissionDemandeComponent;
  let fixture: ComponentFixture<MissionDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
