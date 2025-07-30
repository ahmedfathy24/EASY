import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  addToCart(productId: string) {
    console.log("Adding product:", productId);
    this.cartService.addToCart(productId, 1).subscribe({
      next: (res) => {
        console.log("CART RES:", res);
        alert("Product added to cart!");
      },
      error: (err) => {
        console.error("ERROR ADD CART:", err);
        alert("Error adding to cart: you must be logged in");
      }
    });
  }
  
}
