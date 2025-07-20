import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public router: Router
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addProductForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const productData = this.addProductForm.value;
      productData.price = Number(productData.price);
      productData.quantity = Number(productData.quantity);

      this.adminService.createProduct(productData).subscribe({
        next: (response) => {
          this.successMessage = 'Product added successfully!';
          this.loading = false;
          this.addProductForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admin/update-products']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = error.error?.message || 'Failed to add product. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }

  get formControls() {
    return this.addProductForm.controls;
  }
} 