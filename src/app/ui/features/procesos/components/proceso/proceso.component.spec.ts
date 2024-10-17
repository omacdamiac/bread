import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoComponent } from './proceso.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProcesoComponent', () => {
  let component: ProcesoComponent;
  let fixture: ComponentFixture<ProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
