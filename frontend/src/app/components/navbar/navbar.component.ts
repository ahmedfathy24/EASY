import { Component } from '@angular/core';
import {  Router,RouterLink ,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 constructor(private router: Router, private authService: AuthService) {}
 
 isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}

isAdmin(): boolean {
  return this.authService.isAdmin();
}

logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
