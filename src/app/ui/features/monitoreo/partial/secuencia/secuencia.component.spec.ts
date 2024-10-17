import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuenciaComponent } from './secuencia.component';

describe('SecuenciaComponent', () => {
  let component: SecuenciaComponent;
  let fixture: ComponentFixture<SecuenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
