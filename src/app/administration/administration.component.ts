import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit,OnDestroy {
  showComponentEditaVentana: boolean;
  showComponentLoadFile: boolean;

  constructor(private helperService: HelperService) { }


  ngOnInit(): void {
    this.helperService.detectarData.subscribe(resp=>{
      // //console.log('detecta en form login',resp);
      if(resp==='admin/editsch'){
       this.showComponentEditaVentana=true;
       this.showComponentLoadFile=false;
      }
      else if(resp==='admin/loadfile'){
        this.showComponentEditaVentana=false;
        this.showComponentLoadFile=true;
      }else{
        this.showComponentEditaVentana=false;
        this.showComponentLoadFile=false;
      }
    })
  }

  ngOnDestroy(): void {

  }

}
