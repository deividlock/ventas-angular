import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  ListProduct: any = [];

  constructor(public restApi: ApiService) { }

  ngOnInit() {
    this.getListProductsCart();
  }

  getListProductsCart() {
      return this.restApi.getListCart().subscribe((data: {}) => {
          this.ListProduct = data;
      });
  }
}
