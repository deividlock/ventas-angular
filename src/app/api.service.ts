import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {newArray} from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    apiURL = 'https://ddmb.ddns.net/api/v1';
    count = 0;
    data = new Array();
    i = 0;
    constructor(private http: HttpClient) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getListProducts(): Observable<string> {
        return this.http.get(this.apiURL + '/ventas', )
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
     }

    addListProducts(): Observable<string> {
        return this.http.post(this.apiURL + '/add', JSON.stringify(this.data))
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    getListCart(): Observable<string> {
        return this.http.get(this.apiURL + '/listCart', )
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    public addItem(product) {
        this.count = this.data.length+1;
        this.data.push({
            id: product.id,
            name : product.name,
            price: product.price,
            description: product.description,
            sku: product.sku,
            image: product.image
        });
        this.data.sort();
        console.log(this.data);
    }

    public listProducts() {
        return this.data;
    }

    public clearData() {
        this.data = [];
        this.count = 0;
    }

    public deleteItem(position) {
        this.data.splice(position, 1);
        this.data.filter(Boolean);
        if (this.data.length > 0) {
            this.count--;
        } else {
           this.clearData();
        }
        console.log(this.data);
    }
}