import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  list: any = [];
  totalProduct = 0;
  constructor(public restApi: ApiService, private router: Router) { }

  ngOnInit() {
      this.getListProducts();
  }

  getListProducts() {
      this.list = this.restApi.listProducts();
      for (const Obj of this.list) {
          this.totalProduct = this.totalProduct + parseFloat(Obj.price);
      }
  }

  getShop() {
     this.router.navigate(['/dashboard']);
  }

  toPay() {
      swal.fire({
          title: 'Pago Exitoso',
          text: 'El pago fue realizado exitosamente',
          icon: 'success',
          confirmButtonColor: '#3085d6',
      }).then(() => {
          this.restApi.addListProducts().subscribe();
          this.restApi.clearData();
          this.getShop();
      })
  }

    deleteItem(position) {
        swal.fire({
            title: '¿Desea eliminar el ítem del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                this.restApi.deleteItem(position);
                swal.fire(
                    'Elemento eliminado!',
                    'El elemento fue eliminado satisfactoriamente',
                    'success'
                )
                this.totalProduct = 0.00;
                this.getListProducts();
            }
        })
    }
}
