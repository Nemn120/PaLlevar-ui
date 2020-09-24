import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteConfirmationComponent } from './dialog-delete-confirmation.component';

describe('DialogDeleteConfirmationComponent', () => {
  let component: DialogDeleteConfirmationComponent;
  let fixture: ComponentFixture<DialogDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
