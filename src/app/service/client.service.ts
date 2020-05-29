import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { environment } from 'src/environments/environment';

const { MICROSERVICE_URL } = environment;

@Injectable({
    providedIn: 'root'
})

export class ClientService {
    client: any = {};

    urlClient = 'http://localhost/ProyectoFinalBackend/Controller/Clients/CtlClient.php';
    url = 'http://localhost/ProyectoFinalBackend/Controller/Users/CtlUser.php';
    urlLogin = `${MICROSERVICE_URL}/ProyectoFinalBackend/Controller/Login/Login.php`;
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getClient() {
        return this.http.get<any>(this.urlClient + '?action=list&token=' +
            this.helperService.generarToken());
    }

    getUser() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    getHistory(id: any) {
        return this.http.get<any>(this.urlClient + '?action=history&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

    saveClient(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editClient(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteClient(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

    login(user: any) {
        return this.http.post(this.urlLogin, JSON.stringify(user)).toPromise();
    }
}