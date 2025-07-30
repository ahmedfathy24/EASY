import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ CommonModule , RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error('Error fetching product details:', err)
      });
    }
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
