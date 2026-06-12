import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocontenidoListar } from './tipocontenido-listar';

describe('TipocontenidoListar', () => {
  let component: TipocontenidoListar;
  let fixture: ComponentFixture<TipocontenidoListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocontenidoListar],
    }).compileComponents();

    fixture = TestBed.createComponent(TipocontenidoListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
