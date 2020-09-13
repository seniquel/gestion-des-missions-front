import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneSuppressionComponent } from './ligne-suppression.component';

describe('LigneSuppressionComponent', () => {
  let component: LigneSuppressionComponent;
  let fixture: ComponentFixture<LigneSuppressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneSuppressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
