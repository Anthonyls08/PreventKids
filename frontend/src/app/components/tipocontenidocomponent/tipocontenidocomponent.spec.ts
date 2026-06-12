import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tipocontenidocomponent } from './tipocontenidocomponent';

describe('Tipocontenidocomponent', () => {
  let component: Tipocontenidocomponent;
  let fixture: ComponentFixture<Tipocontenidocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tipocontenidocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tipocontenidocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
