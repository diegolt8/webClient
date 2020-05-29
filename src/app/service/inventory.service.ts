import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {
    inventory: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Inventories/CtlInventory.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getInventory() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }
    
    saveInventory(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editInventory(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteInventory(id: any, img:any) {
        return this.http.delete(this.url + '?action=delete&nameImg=' + img + '&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

    updateQuantity(id: any, quantity:any) {
        return this.http.get(this.url + '?action=updatequantity&quantity=' + quantity + '&id=' + id + '&token=' +
            this.helperService.generarToken()).toPromise();
    }

}