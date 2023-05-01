import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { EdituserscheduleComponent } from './components/edituserschedule/edituserschedule.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoadfileComponent } from './components/loadfile/loadfile.component';
import { InterceptorService, SpinnerService } from '../interceptors/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoadfileComponent,
    EdituserscheduleComponent,
    AdministrationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 10000, // 10 seconds
      closeButton: true,
      progressBar: true,
    }),
    AdministrationRoutingModule
  ],
  providers: [
    SpinnerService,ToastrService,

    {
      provide:HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    }
  ],
})
export class AdministrationModule { }
