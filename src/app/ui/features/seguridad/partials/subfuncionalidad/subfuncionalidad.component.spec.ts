import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfuncionalidadComponent } from './subfuncionalidad.component';

describe('SubfuncionalidadComponent', () => {
  let component: SubfuncionalidadComponent;
  let fixture: ComponentFixture<SubfuncionalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubfuncionalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubfuncionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
