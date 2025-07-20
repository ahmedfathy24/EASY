import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-latest',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.css'
})
export class LatestComponent  implements OnInit {

  latestProducts: any[] = [];

  constructor(private productService: ProductService) { }

 ngOnInit() {
    this.productService.getLatestProducts().subscribe(data => {
      this.latestProducts = data;
    });
    ;
  }

}
