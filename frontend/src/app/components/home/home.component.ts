import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LatestComponent } from '../products/latest/latest.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink , LatestComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
} 
