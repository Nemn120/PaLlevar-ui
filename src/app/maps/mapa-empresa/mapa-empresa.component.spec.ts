import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEmpresaComponent } from './mapa-empresa.component';

describe('MapaEmpresaComponent', () => {
  let component: MapaEmpresaComponent;
  let fixture: ComponentFixture<MapaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
