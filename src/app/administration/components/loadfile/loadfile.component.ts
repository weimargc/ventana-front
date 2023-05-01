import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../.././../interceptors/interceptor.service';
import { HelperService } from '../../../shared/helper.service';
import { AdministrationService } from '../../services/administration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loadfile',
  templateUrl: './loadfile.component.html',
  styleUrls: ['./loadfile.component.css']
})
export class LoadfileComponent implements OnInit {


  public title: string = "Cargue masivo de candidatos a grado";
  nombreArchivo: string = '';
  habilitarCarga: boolean = false;
  fileToUpload: File = null;
  fileName = '';
  fileSize = 0;

  respuestaCarga: any;
  files: any;
  listaDeErrores:any;
  isModalClose: boolean;
  listaDeErroresTemp=[];
  correctaSolicitudHttp = false;
  apiCargueLlamada: boolean;
  initSpinner() {
    this._spinnerService.getSpinnerObserver().subscribe((status) => {
      this.correctaSolicitudHttp = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

  constructor(private modalService: NgbModal,private toastr: ToastrService,
    private service:AdministrationService, private helperService:HelperService,public titleService: Title
    ,public _spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef, //para detectar cambios de estado de spinner
    ) {
      this.titleService.setTitle(this.title);
     }


  ngOnInit(): void {
    this.initSpinner();
  }


  abrirModalcargarArchivoCandidatos(contentLoadFile) {
    this.listaDeErrores = null;
    this.fileToUpload = null;
    this.modalService.open(contentLoadFile, { centered: true, backdrop:'static', size: 'lg' });
    }

  onFileChanges(files: FileList) {

    if(!files || files.length==0)  return this.mensajeSeleccioneArchivo();

      this.nombreArchivo = files[0].name;
      let tipoFile = files[0].name.split(".").pop();

      if (tipoFile != "csv") {
        this.toastr.show('El archivo debe ser de tipo CSV');
        this.nombreArchivo = '';

        return;
      }
      this.fileToUpload = files.item(0);
      this.fileName = files.item(0).name;
      this.fileSize = files.item(0).size;
      //FileSize 2 MB
      if (this.fileSize < 2000000) {
      } else {
        this.toastr.show('El archivo supera los 2 MBytes, revise e intente nuevamente')
        this.modalService.dismissAll();
        return;
      }
    }

    cerrarModal() {
      this.nombreArchivo = '';
      this.listaDeErrores = null;
      this.isModalClose = true;
      this.modalService.dismissAll();
    }

    import() {
      if (this.fileToUpload !== null) {
        this.nombreArchivo = '';
        this.onUpload();
      } else {
        return this.mensajeSeleccioneArchivo();
      }

    }

  private mensajeSeleccioneArchivo() {
    this.toastr.show('Debe seleccionar un archivo');
    this.nombreArchivo = '';

    return;
  }

    onUpload() {
      const formData = new FormData();
      formData.append('data', this.fileToUpload)

      // this.service.cargarArchivoCandidatosCsv(formData).subscribe(res => {
      //   this.apiCargueLlamada=true;
      //   this.isModalClose = false;
      //   if(res.data.error){
      //     if(res.data.error >= 400){
      //       this.toastr.show('Revise la estructura del archivo');
      //       this.cerrarModal()
      //     }else{
      //       this.toastr.show('No se pudo cargar el archvivo, revise e intente nuevamente');
      //       this.cerrarModal()
      //     }
      //   }
      //   else if(res.data.errores){
      //     this.listaDeErrores=res.data.errores;
      //     this.listaDeErroresTemp = JSON.parse(JSON.stringify(this.listaDeErrores))
      //   }
      //   this.respuestaCarga = res;
      //   if(this.respuestaCarga.message && this.respuestaCarga.message === 'Revise las columnas del archivo'){
      //     this.listaDeErrores= [];
      //     this.listaDeErrores.push('Archivo incorrecto - Revise la estructura del archivo');
      //     this.listaDeErroresTemp = JSON.parse(JSON.stringify(this.listaDeErrores))
      //     this.toastr.show('Revise la estructura del archivo');
      //   }
      //   this.fileToUpload = null;
      //   //console.log('this.respuestaCarga',this.respuestaCarga);
      //   this.nombreArchivo = '';
      // }, error => {
      //   //console.log('this.respuestaCargaerror',error);
      //   this.isModalClose = false;
      //   //this.cerrarModal()
      //   if(error.status>=500 && error.status<=599){
      //     this.toastr.show(error.message + '. Contacte al administrador');
      //   }else{
      //     let errores =  error.error;
      //     // for (var key in errores) {
      //     //   this.toastr.show(key +' - ' + errores[key]);
      //     // }
      //     this.toastr.show('No se pudo cargar el archvivo, revise la estructura y datos e intente nuevamente');
      //   }
      // });
    }

    descargarErroresCarga(){
      let listaTemp = [];
      this.listaDeErroresTemp.forEach(elem =>{
        //console.log(elem);
        const stringArray = elem.split('-');
        const item = {
          Registro:stringArray[0],
          DetalleError:stringArray[1]
        }
        listaTemp.push(item);
      });
        // this.service.exportAsExcelFile(listaTemp, 'ErroresCargaCandidatos');
    }

    onClickAceptar() {
      this.modalService.dismissAll();
    }

}
