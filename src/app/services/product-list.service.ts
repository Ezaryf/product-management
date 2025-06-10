import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductListService {
    private base = `${environment.apiBase}/data/productList`;

    constructor(private http: HttpClient) { }

    getProducts(token: string): Observable<Product[]> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Product[]>(this.base, { headers });
    }
}