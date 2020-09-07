import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificationComponent } from './modal-modification.component';

describe('ModalModificationComponent', () => {
  let component: ModalModificationComponent;
  let fixture: ComponentFixture<ModalModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
