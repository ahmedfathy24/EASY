// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.errorMessage = '';
    this.adminService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.errorMessage = 'Failed to load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  updateOrderStatus(orderId: string, newStatus: string): void {
    this.adminService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        this.successMessage = 'Order status updated successfully!';
        this.loadOrders();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error updating order:', err);
        this.errorMessage = 'Failed to update order status. Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.adminService.deleteOrder(orderId).subscribe({
        next: () => {
          this.successMessage = 'Order deleted successfully!';
          this.loadOrders();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          this.errorMessage = 'Failed to delete order. Please try again.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
