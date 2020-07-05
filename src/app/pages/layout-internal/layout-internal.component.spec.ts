import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInternalComponent } from './layout-internal.component';

describe('LayoutInternalComponent', () => {
  let component: LayoutInternalComponent;
  let fixture: ComponentFixture<LayoutInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
