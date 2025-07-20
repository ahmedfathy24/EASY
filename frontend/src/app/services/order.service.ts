import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private baseUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, {}); 
  }
}
