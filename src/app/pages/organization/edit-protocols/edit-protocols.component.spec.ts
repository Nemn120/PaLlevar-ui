import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocolsComponent } from './edit-protocols.component';

describe('EditProtocolsComponent', () => {
  let component: EditProtocolsComponent;
  let fixture: ComponentFixture<EditProtocolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProtocolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
