import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { product: productId, quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove`, {body :{ product: productId }});
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, { product: productId, quantity });
  }
}
