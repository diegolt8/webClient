import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class CityService {
    city: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Cities/CtlCity.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getCity() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveCity(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editCity(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteCity(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }
}