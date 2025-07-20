import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products-list/products-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { UpdateProductsComponent } from './components/admin/update-products/update-products.component';

export const routes: Routes = [
  {path: '',component: HomeComponent,title: 'EASY Store'}
  ,{path: 'products',component: ProductsComponent,title: 'Products '}
  ,{path: 'products/:id',component: ProductDetailsComponent,title: 'Product Details '}
  ,{path: 'register',component: RegisterComponent,title: 'Sign Up '}
  ,{path: 'login',component: LoginComponent,title: 'Login '}
  ,{path: 'cart',component: CartComponent,title: 'Cart '}
  ,{path: 'orders',component: OrdersComponent,title: 'Orders '}
  ,{path: 'admin',component: AdminDashboardComponent,title: 'Admin '}
  ,{path: 'admin/orders',component: AdminDashboardComponent,title: 'Admin Orders '}
  ,{path: 'admin/add-product',component: AddProductComponent,title: 'Add Product '}
  ,{path: 'admin/update-products',component: UpdateProductsComponent,title: 'Update Products '}
];
