import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadListar } from './especialidad-listar';

describe('EspecialidadListar', () => {
  let component: EspecialidadListar;
  let fixture: ComponentFixture<EspecialidadListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadListar],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
