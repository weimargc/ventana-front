import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InterceptorService, SpinnerService } from '../interceptors/interceptor.service';
import { environment } from '../../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000, // 10 seconds
      closeButton: true,
      progressBar: true,
    }),
    AuthenticationRoutingModule
  ],
  providers: [
    SpinnerService,ToastrService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    }
  ],
})
export class AuthenticationModule { }
