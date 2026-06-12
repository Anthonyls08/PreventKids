import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Especialidadcomponent } from './especialidadcomponent';

describe('Especialidadcomponent', () => {
  let component: Especialidadcomponent;
  let fixture: ComponentFixture<Especialidadcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Especialidadcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Especialidadcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
