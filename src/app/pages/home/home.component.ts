import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductListService } from '../../services/product-list.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({ selector: 'app-home', templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['productName', 'url', 'actions'];

  constructor(
    private svc: ProductListService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const token = this.auth.getToken()!;
    this.svc.getProducts(token).subscribe(data => this.products = data);
  }

  logout() { this.auth.logout(); }

  add() { /* open dialog to add */ }
  edit(p: Product) { /* open dialog to edit */ }
  remove(p: Product) { this.products = this.products.filter(x => x !== p); }
}