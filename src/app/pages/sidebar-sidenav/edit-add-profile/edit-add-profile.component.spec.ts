import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddProfileComponent } from './edit-add-profile.component';

describe('EditAddProfileComponent', () => {
  let component: EditAddProfileComponent;
  let fixture: ComponentFixture<EditAddProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
