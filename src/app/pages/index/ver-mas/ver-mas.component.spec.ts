import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMasComponent } from './ver-mas.component';

describe('VerMasComponent', () => {
  let component: VerMasComponent;
  let fixture: ComponentFixture<VerMasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
