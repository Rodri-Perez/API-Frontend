import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgFor, NgIf } from '@angular/common';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Carrito } from '../../models/carrito';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, ToastrModule],
  providers: [CargarScriptsService],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css',
})
export class ListarProductosComponent implements OnInit {
  auth = false;

  carrito: Carrito[] = [];
  productoCarrito: Producto[] = [];
  aux: Producto[] = [];
  aux_carrito = {};
  cant = 0;
  listProductos: Producto[] = [];
  bus = '';
  busc = '';
  busca = 0;

  constructor(
    private _cargaScripts: CargarScriptsService,
    private __productoService: ProductoService,
    private _toastService: ToastrService,
  ) {
    _cargaScripts.carga(['js/dinamic']);
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.__productoService.getAllProductos().subscribe((data) => {
      this.listProductos = data;
    });
  }

  eliminarProducto(id: any) {
    this.__productoService.eliminarProducto(id).subscribe(
      (data) => {
        this.obtenerProductos();
        this._toastService.success('Producto eliminado correctamente');
      },
      (error) => {
        console.log(error);
        this._toastService.error('Producto inexistente');
      },
    );
  }
  cambio(talle: string) {
    this.bus = talle;
  }
  agregarProducto(id: any) {
    this.__productoService.obtenerProducto(id).subscribe(
      (data) => {
        if (this.carrito.length == 0) {
          this.carrito.push({
            producto: data,
            cantidad: this.cant,
          });
        } else {
          this.carrito.forEach((e) => {
            if (e.producto.id == data.id) {
              e.cantidad += 1;
            }
          });
        }
        // if (this.carrito.length == 1) {
        //   this.carrito.push({
        //     producto: data,
        //     cantidad: 0,
        //   });
        //   console.log('ingreso 2');
        // } else {
        //   this.carrito.forEach((e) => {
        //     if (e.producto.id == data.id) {
        //       e.cantidad = e.cantidad + 1;
        //       console.log('iguales');
        //     } else {
        //       this.carrito.push({
        //         producto: data,
        //         cantidad: 0,
        //       });
        //       console.log('entre aca');
        //     }
        // carrito = {
        //   producto: data,
        //   cantidad: this.cant,
        // };
        //   });
        // }
        // this.productoCarrito.push(data);
        // this._toastService.success('Producto agregado al carrito');
      },
      (error) => {
        console.log(error);
        this._toastService.error('Producto inexistente');
      },
    );
    this.carrito.forEach((e) => {
      console.log(e);
    });
  }
  quitarProducto(id: any) {
    this.aux = this.productoCarrito.filter((e) => e.id !== id);
    this.productoCarrito = this.aux;
    this._toastService.success('Producto borrad del carrito');
  }
  cambio_cat(categoria: string) {
    this.busc = categoria;
  }
  cambio_precio(precio: number) {
    this.busca = precio;
  }
}
