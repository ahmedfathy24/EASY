import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
     registerForm: any;  
    constructor(private _FormBuilder: FormBuilder , private _AuthService: AuthService) {}
    ngOnInit() {
    this.registerForm = this._FormBuilder.group(
    {
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    { validators: this.passwordMatch.bind(this) }
    );
    }

  passwordMatch(group: any) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }
  successMessage: string = '';
  errorMessage: string = '';
  onSubmit() {
    if (this.registerForm.valid) {
        this._AuthService.registerUser(this.registerForm.value).subscribe({
          next: (res) => {
            console.log('Signup success:', res);
            this.successMessage = 'Account created successfully! You can now login.';
            this.errorMessage = '';
          },
          error: (err) => {
            console.error('Signup error:', err);
            if (err.status === 409) {
              this.errorMessage = 'This email is already registered. Please login.';
            } else {
              this.errorMessage = 'Something went wrong. Please try again.';
            }
            this.successMessage = '';
          }
        });
      } else {
        this.registerForm.markAllAsTouched();
      }
    }
}
