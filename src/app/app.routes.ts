import { Routes } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { SigInComponent } from './components/sig-in/sig-in.component';

import { CarritoComponent } from './components/carrito/carrito.component';

import { VistaProductoComponent } from './components/vista-producto/vista-producto.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResumenComponent } from './components/resumen/resumen.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'user/:user', component: WelcomeComponent },
  { path: 'listar-productos', component: ListarProductosComponent },
  { path: 'listar-productos/user/:id', component: ListarProductosComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'editar-producto/:id', component: CrearProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigInComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'producto/:id', component: VistaProductoComponent },
  { path: 'usuario/:id', component: ProfileComponent },
  { path: 'resumen/:user', component: ResumenComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
