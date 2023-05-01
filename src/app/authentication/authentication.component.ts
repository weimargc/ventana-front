import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../shared/constants.class';
import { SpinnerService } from '../interceptors/interceptor.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('contentModalInfoVentanaTiempo', { static: false })
  childModalInfoVentanaTiempo: ElementRef;

  title = 'pdf';

  form: FormGroup | any;
  msgError: boolean = false;
  submitted: boolean = false;
  loader: boolean = false;
  data: string = '';

  modal: any;

  recaptchaTemp: NgForm;
  correctaSolicitudHttp = false;
  date: Date = new Date();
  listaVentanasTiempo=[];
  initSpinner() {
    this._spinnerService.getSpinnerObserver().subscribe((status) => {
      this.correctaSolicitudHttp = status === 'start';
      this.cdRef.detectChanges();
    });
  }

  constructor(
    private cdRef: ChangeDetectorRef, //para detectar cambios de estado de spinner
    private fb: FormBuilder,
    private loginService: LoginService,
    private modalService: NgbModal,
    public _spinnerService: SpinnerService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }


  ngOnInit(): void {

    this.initSpinner();
    this.crearrForm();
  }

  crearrForm() {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', Validators.required],
    });
  }

  login(formRecaptcha: NgForm) {
    let nombreUsuario: string = this.form.value.user.split('@')[0];
    const datosValidaEstudiante = {
      user: nombreUsuario.trim().toLowerCase(),
      pass: this.form.value.pass,
    };
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    sessionStorage.clear();
    this.loginService.login(datosValidaEstudiante).subscribe({
      next: (resp) => {
        console.log(resp);
        //Si data tiene información es un estudiante válido de lo contrario es un usuario Administrador
        if (resp.data) {
          if (resp.data.length > 0) {
            this.listaVentanasTiempo=resp.data;
            this.abrirModalConsultaVentanaTiempo();
          } else {
            this.toastrService.warning('Lo sentimos, no existen registros', 'Sin información!');
          }
        } else {
          //Se guarda la información del usuario Administrador
          sessionStorage.setItem('datainit', resp.access)
          this.router.navigate(['admin']);
        }
      },
      error: (error) => {
        sessionStorage.clear();
        if (error.status === 403) {
          this.toastrService.warning('Usuario o contraseña incorrectos. Intenta nuevamente.', 'No autorizado!');
        } else {
          //console.log(error);
          this.listaVentanasTiempo = [];
          this.toastrService.error(Constants.MENSAJES_ALERTS.ERROR_API, 'Error!');
        }
      },
    });
  }

  abrirModalConsultaVentanaTiempo() {
    this.modalService.open(this.childModalInfoVentanaTiempo, {
      backdrop: 'static',centered: true,size:'md'
    });
  }


  openModalAutorizaDatos(modalTratamientoDatos) {
    this.modalService.open(modalTratamientoDatos, {
      centered: true,
      backdrop: 'static',
    });
  }

  cerrarModal() {

    this.modalService.dismissAll();
    if (this.recaptchaTemp) {
      let recaptTempoData = this.recaptchaTemp.controls['recaptcha'];
      if (recaptTempoData) {
        this.recaptchaTemp.controls['recaptcha'].setValue(null);
      }
    }
  }

  ngOnDestroy(): void {
  }

}
