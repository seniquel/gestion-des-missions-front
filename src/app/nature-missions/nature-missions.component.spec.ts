import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureMissionsComponent } from './nature-missions.component';

describe('NatureMissionsComponent', () => {
  let component: NatureMissionsComponent;
  let fixture: ComponentFixture<NatureMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
