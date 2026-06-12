import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocontenidoInsertar } from './tipocontenido-insertar';

describe('TipocontenidoInsertar', () => {
  let component: TipocontenidoInsertar;
  let fixture: ComponentFixture<TipocontenidoInsertar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocontenidoInsertar],
    }).compileComponents();

    fixture = TestBed.createComponent(TipocontenidoInsertar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
