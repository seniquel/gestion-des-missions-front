import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutComponent } from './modal-ajout.component';

describe('ModalAjoutComponent', () => {
  let component: ModalAjoutComponent;
  let fixture: ComponentFixture<ModalAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
