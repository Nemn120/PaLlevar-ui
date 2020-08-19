import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaClienteComponent } from './mapa-cliente.component';

describe('MapaClienteComponent', () => {
  let component: MapaClienteComponent;
  let fixture: ComponentFixture<MapaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
