import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const { MICROSERVICE_URL } = environment;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  url = `${MICROSERVICE_URL}/ProyectoFinalBackend/Controller/Base64/CtlBase64.php`;
  /*Barra de carga mostrada al usuario*/
  loading: any;
  /*Variable bandera que indicara si hay una peticion pendiente
  de una apertura de una barra de carga*/
  isLoadingLoadModal = false;

  public activeLang = 'es';

  myDate = new Date();

  /*Dependencias del servicio
  alertCtrl: Depedencia para los modales
  loadingCtrl: Dependencia para las barras de carga,
  Storage: Almacenamiento local*/
  constructor(
    private datePipe: DatePipe, private http: HttpClient
  ) {
  }

  public generarToken() {
    const fechaActual = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    const palabraClave = 'webCliente';
    const token = palabraClave + fechaActual;
    /* console.log("Lo que se va a codificar es " + token); */
    const md5 = new Md5();
    const tokenApp = md5.appendStr(token).end();
    return tokenApp;
  }

  getImageBase64(news: any): any {
    return this.http.post(this.url, JSON.stringify(news));
}
}