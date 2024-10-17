import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [RouterTestingModule,
        ToastrModule.forRoot({
          timeOut: 800,
          progressBar: true,
          onActivateTick: true,
          enableHtml: true,
        })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia tener como titulo', () => {
    const fixture = TestBed.createComponent(AuthComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('webpri');
  });

  // it('should be valid if form value is valid', () => {
  //   component.contactForm.setValue({
  //     "name": "Bobby", 
  //     "email": "bobby@bobby.com", 
  //     "message": "Email me a soda, please."
  //   });

  //   expect(component.contactForm.valid).toEqual(true);
  // });


});
