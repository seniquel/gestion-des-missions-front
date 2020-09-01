import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMissionsComponent } from './validation-missions.component';

describe('ValidationMissionsComponent', () => {
  let component: ValidationMissionsComponent;
  let fixture: ComponentFixture<ValidationMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
