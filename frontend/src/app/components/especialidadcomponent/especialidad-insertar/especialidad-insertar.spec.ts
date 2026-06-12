import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadInsertar } from './especialidad-insertar';

describe('EspecialidadInsertar', () => {
  let component: EspecialidadInsertar;
  let fixture: ComponentFixture<EspecialidadInsertar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadInsertar],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadInsertar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
