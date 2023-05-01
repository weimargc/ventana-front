import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request){
    return this.http.post<any>(`${environment.apiBase}${environment.login}`,request)
    .pipe(
      map(respuesta => {
        //this.respuestaLogin = respuesta;
        //console.log("respuesta autenticacion", this.respuestaLogin);
        return respuesta;
      }));
  }

  downloadPDF(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('X-Authorization', 'D1051bYTego:APA91bEvMz-bc0TroLp8W56q9uIJsuSvMzXlljBGLCqqr6em5q3Wk2eDdY6v79vR3D5rjHS8J-8fpGvUuDvjUss');
    //return this.http.post(`${environment.url}ConsultaCertificado`, data, { headers });
  }


}
