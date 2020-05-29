import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InventoryService } from 'src/app/service/inventory.service';
import { Router } from '@angular/router';

const { MICROSERVICE_URL } = environment;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  products: any = [];
  product: any = [];

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.inventoryService.getInventory().subscribe(data => {
      if (data.res !== 'NotInfo') {
        this.products = JSON.parse(JSON.parse(JSON.stringify(data)).data);
        this.product = this.products[0];


        this.products.forEach(element => {
          const url = this.urlImage + element.imagen;
          element.imagen = url;
        });
      } else {
        this.products = [];
      }
    });
  }

  showProduct(id: any) {
    this.router.navigate(['infoProducts'], id);
  }

}
