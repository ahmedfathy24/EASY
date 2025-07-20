import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/orders/all`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/orders/${orderId}`, { status });
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/orders/${orderId}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/admin/create`, productData);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/admin/update/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/admin/delete/${productId}`);
  }
}
