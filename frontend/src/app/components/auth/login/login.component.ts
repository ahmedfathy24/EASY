import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private _FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          if (res.user && res.user.role) {
            localStorage.setItem('role', res.user.role);
          } else {
            localStorage.setItem('role', 'user');
          }

          this.successMessage = 'Login successful! Redirecting...';
          this.errorMessage = '';
          setTimeout(() => {
            if (this.authService.isAdmin()) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          }, 1500);
        },
        error: (err) => {
          console.error('Login error:', err);
          if (err.status === 401 || err.status === 422) {
            this.errorMessage = 'Invalid email or password.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
          this.successMessage = '';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
