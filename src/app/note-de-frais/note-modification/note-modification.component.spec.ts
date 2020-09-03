import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteModificationComponent } from './note-modification.component';

describe('NoteModificationComponent', () => {
  let component: NoteModificationComponent;
  let fixture: ComponentFixture<NoteModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
