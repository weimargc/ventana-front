import { Component, OnInit, HostListener, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
//Animaciones
import { trigger, style, transition, animate, state } from '@angular/animations'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../shared/helper.service';
import { Menu, Opciones } from '../../interfaces/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateY(-10%)',
      })),
      transition(':enter', [
        animate(300, style({
          transform: 'translateY(0)',
        }))
      ])
    ])
  ]
})


export class MenuComponent implements OnInit, AfterViewInit {

  urlMenuActive: string;
  moduloseleccionado: any;
  graduadoSelectedNgM: any;
  listaProgramasEstudiante: any[] = [];
  @Input() mostrarMenuEncuestaSatisfaccion: boolean;
  opcionesMenu: any;

  constructor(private router: Router, private modalService: NgbModal, private helperService: HelperService) {
    const menu = [{
      nombre: "Inicio",
      descripcion: "Inicio",
      rol: "ADMIN",
      icono: "",
      imagen: "",
      url: "admin",
      opciones: []
    },
    {
      nombre: "Editar ventana",
      descripcion: "Administrar ventana",
      rol: "ADMIN",
      icono: "",
      imagen: "",
      url: "admin/editsch",
      opciones: []
      // opciones: [
      //   {
      //     nombre: "Editar ventana",
      //     descripcion: "",
      //     rol: "ADMIN",
      //     estado: true,
      //     url: ""
      //   }
      // ]
    },
    {
      nombre: "Cargar archivo",
      descripcion: "Cargar archivo",
      rol: "ADMIN",
      icono: "",
      imagen: "",
      url: "admin/loadfile",
      opciones: []
    }]

    this.opcionesMenu = JSON.parse(JSON.stringify(menu));

    console.log("opciones menu:>>", this.opcionesMenu);
    this.ResolucionPantalla();
  }




  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  public enrutarComponente(ruta: string, opciones){
    this.helperService.getDataHelper(ruta);
 }

 public enrutarComponenteConRuta(ruta: string, opciones){
  if(opciones.length == 0)
  {
    this.router.navigate([ruta]);
    this.urlMenuActive = ruta;
  }
}

  //funciones para menu responsive
  estado: number = 0;
  desplegado: boolean = false;
  @HostListener('window:resize', ['$event'])//evalua constantemente cambios en resolucion de pantalla
  public ResolucionPantalla() {
    this.desplegado = true;
    if (window.innerWidth >= 768) {
      this.desplegado = true;
      this.estado = 1;
      //console.log("estado", this.estado);
    } else {
      this.desplegado = false;
      this.estado = 0;
    }
    //console.log('cambio resolucion', window.innerWidth);

  }

  public menuCollapse() {
    //console.log('estado y desplegado',this.estado,this.desplegado);
    if (this.estado == 0) {
      this.desplegado = true;
      this.estado = 1;
    }
    else {
      //console.log('estado=0 y desplegado=false');
      this.desplegado = false;
      this.estado = 0;
    }
  }

  public menuCollapseDesdeOpciones() {
    //console.log('estado y desplegado',this.estado,this.desplegado);
    //Tomar los valores si reolución está mayor a 768px o mobile
    this.ResolucionPantalla();
  }

  opcionesContraidas: boolean = true;
  minimizarMenu() {
    if (this.opcionesContraidas) {
      this.opcionesContraidas = false;
    } else {
      this.opcionesContraidas = true;
    }
  }



  valueChange(event) {
    //SE GUARDA EL ID DEL GRADUADO
    this.graduadoSelectedNgM = +event.target.value;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }



}
