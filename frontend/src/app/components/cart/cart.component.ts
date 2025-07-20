import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = { items: [] };
  totalPrice = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private cartService: CartService , private router: Router , private ordersService: OrdersService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.calculateTotal();
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cart.items.reduce((acc: number, item: any) => {
      return acc + (item.product.price * item.quantity);
    }, 0);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error removing item:', err)
    });
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
        alert('Quantity must be greater than 0');   
        quantity = 1;
    }  
    this.cartService.updateCartItem(productId, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error updating quantity:', err)
    });
  }

  checkout(): void {
    this.ordersService.checkout().subscribe({
      next: (data) => {
        this.successMessage = 'Order placed successfully!';
        this.errorMessage = '';
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Checkout failed. Please try again.';
        }
        this.successMessage = '';
      }
    });
  }
}
