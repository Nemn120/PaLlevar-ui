import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosMenuComponent } from './ver-productos-menu.component';

describe('VerProductosMenuComponent', () => {
  let component: VerProductosMenuComponent;
  let fixture: ComponentFixture<VerProductosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerProductosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProductosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
