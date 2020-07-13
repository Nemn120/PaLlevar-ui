import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAceptarComponent } from './dialog-aceptar.component';

describe('DialogAceptarComponent', () => {
  let component: DialogAceptarComponent;
  let fixture: ComponentFixture<DialogAceptarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAceptarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAceptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
