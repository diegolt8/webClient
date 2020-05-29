import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/service/inventory.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';

const { MICROSERVICE_URL } = environment;

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {

  urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  idProduct: any = 0;

  products: any = [];
  findProduct: any = [];
  showProduct: any = [];
  product: any = {};
  constructor(private inventoryService: InventoryService, private router: ActivatedRoute, private helperService: HelperService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  showProducts() {
    this.idProduct = this.router.snapshot.paramMap.get('idProduct');
    this.products.forEach(element => {
      if (element.id === this.idProduct) {
        this.findProduct.push(element);
      }
    });
    this.helperService.getImageBase64(this.findProduct).subscribe(data => {
      this.showProduct = data.data;
      this.product = this.showProduct[0];
    })
  }

  getProducts() {
    this.inventoryService.getInventory().subscribe(data => {
      if (data.res !== 'NotInfo') {
        this.products = JSON.parse(JSON.parse(JSON.stringify(data)).data);
        this.products.forEach(element => {
          const url = this.urlImage + element.imagen; element.imagen = url;
        });
        this.showProducts();
      } else {
        this.products = [];
      }
    })
  }

}
