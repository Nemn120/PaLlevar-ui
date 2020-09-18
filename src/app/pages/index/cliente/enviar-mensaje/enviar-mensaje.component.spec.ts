import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMensajeComponent } from './enviar-mensaje.component';

describe('EnviarMensajeComponent', () => {
  let component: EnviarMensajeComponent;
  let fixture: ComponentFixture<EnviarMensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarMensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
