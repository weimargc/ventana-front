import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Constants } from './constants.class';

// Servicio compartido para pasar data entre componentes No relacionados
@Injectable({
  providedIn: 'root'
})
export class HelperService {


  private idEstudiante? =  new BehaviorSubject<number>(null);
  public detectarIdEstudiante = this.idEstudiante.asObservable();

  private data? =  new BehaviorSubject<any>(null);
  public detectarData = this.data.asObservable();

  @Output() disparaData: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  public GetIdEstudiante(id): void {
    this.idEstudiante.next(id);
    //console.log('idEstudianteActual: ', id);
  }

  public getDataHelper(data): void {
    this.data.next(data);
    //console.log('idEstudianteActual: ', id);
  }

  public crearLlavesSessionStorageModulosHelper(data): void {
       //Se crea una llave en sesionstorage para utilzarla y controlar la pantalla de encuesta lo que ha respondido el usuario
       if(data.modulo.rol=== Constants.ROLES.MENU_DATOS_BASICOS){
        sessionStorage.setItem('sh_dbasic',data.idGraduado);
      }
      else if(data.modulo.rol=== Constants.ROLES.MENU_ENCUESTA_FINANCIACION){
        sessionStorage.setItem('sh_dfinan',data.idGraduado);
      }
      else if(data.modulo.rol=== Constants.ROLES.MENU_ENCUESTA_LABORALES){
        sessionStorage.setItem('sh_dlabora',data.idGraduado);
      }
      else if(data.modulo.rol=== Constants.ROLES.MENU_INTERESES_EXPECTATIVAS){
        sessionStorage.setItem('sh_dinteres',data.idGraduado);
      }
      else if(data.modulo.rol=== Constants.ROLES.MENU_ENCUESTA_SATISFACCION){
        sessionStorage.setItem('sh_ecsa',data.idGraduado);
      }else{
        return;
      }


      this.router.navigate([data.modulo.url]);
  }

  logoutAdmin() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
