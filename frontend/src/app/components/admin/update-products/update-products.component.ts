import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { ProductService } from '../../../services/product.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-update-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterModule],  
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = false;
  editingProduct: any = null;
  editForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loading = false;
      }
    });
  }

  startEdit(product: any): void {
    this.editingProduct = product;
    this.editForm.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      description: product.description
    });
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingProduct) {
      const updatedData = this.editForm.value;
      updatedData.price = Number(updatedData.price);
      updatedData.quantity = Number(updatedData.quantity);

      this.adminService.updateProduct(this.editingProduct._id, updatedData).subscribe({
        next: (response) => {
          this.successMessage = 'Product updated successfully!';
          this.editingProduct = null;
          this.editForm.reset();
          this.loadProducts();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.errorMessage = error.error?.message || 'Failed to update product. Please try again.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(productId).subscribe({
        next: () => {
          this.successMessage = 'Product deleted successfully!';
          this.loadProducts();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = error.error?.message || 'Failed to delete product. Please try again.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  get formControls() {
    return this.editForm.controls;
  }
} 