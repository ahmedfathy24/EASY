import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/order.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  myOrders: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (data) => this.myOrders = data.orders || [],
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
