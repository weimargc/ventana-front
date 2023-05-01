import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName : string;
  constructor(private router: Router,private helperService: HelperService) {
      // this.userName = sessionStorage.getItem("username");
      this.userName = 'Nombre del usuario';
  }

  ngOnInit(): void {
  }

  mostrarBotones(): boolean{
    if (!sessionStorage.getItem("tokenAccess") && !sessionStorage.getItem("tokenRefresh")){
      //console.log('MostrarBotones false');
      return false;
    }
    else
    {
      //console.log('MostrarBotones true');
      return true;
    }
  }

  cerrarSesion(){
   this.helperService.logoutAdmin();
  }

  perfil(){
    this.router.navigate(['/dashboard/home/perfil']);
  }

}
