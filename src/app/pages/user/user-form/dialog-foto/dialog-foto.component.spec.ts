import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFotoComponent } from './dialog-foto.component';

describe('DialogFotoComponent', () => {
  let component: DialogFotoComponent;
  let fixture: ComponentFixture<DialogFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
