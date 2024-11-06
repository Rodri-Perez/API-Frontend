import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgFor, NgIf } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Carrito } from '../../models/carrito';
import { filter } from 'rxjs';

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
  cant = 1;
  listProductos: Producto[] = [];
  auxProductos: Producto[] = [];

  total = 0;

  constructor(
    private _cargaScripts: CargarScriptsService,
    private __productoService: ProductoService,
    private _toastService: ToastrService,
  ) {
    _cargaScripts.carga(['js/dinamic']);
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.recuperarArray();
  }

  guardarArray() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    localStorage.setItem('total', String(this.total));
    console.log(localStorage.getItem('carrito'));
  }

  recuperarArray() {
    const arrayGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');
    console.log(arrayGuardado);
    if (arrayGuardado) {
      this.carrito = JSON.parse(arrayGuardado);
    }
    if (totalGuardado) {
      this.total = Number(totalGuardado);
    }
  }

  obtenerProductos() {
    this.__productoService.getAllProductos().subscribe((data) => {
      this.listProductos = data;
      this.auxProductos = data;
    });
  }

  eliminarProducto(id: any) {
    this.__productoService.eliminarProducto(id).subscribe(
      () => {
        this.obtenerProductos();
        this._toastService.success('Producto eliminado correctamente');
      },
      (error) => {
        console.log(error);
        this._toastService.error('Producto inexistente');
      },
    );
  }
  agregarProducto(id: any) {
    this.__productoService.obtenerProducto(id).subscribe(
      (data) => {
        if (this.carrito.length == 0) {
          this.total += data.precio;
          this.carrito.push({
            id: data.id,
            nombre: data.nombre,
            precio: data.precio,
            cantidad: this.cant,
          });
          this._toastService.success('Producto agregado al carrito');
          this.guardarArray();
        } else {
          this.carrito.forEach((e) => {
            if (e.id == data.id) {
              this.total += data.precio;
              e.cantidad += 1;
              this._toastService.success('Producto agregado al carrito');

              this.guardarArray();
            } else if (
              !this.carrito.some((producto) => producto.id == data.id)
            ) {
              this.total += data.precio;
              this.carrito.push({
                id: data.id,
                nombre: data.nombre,
                precio: data.precio,
                cantidad: this.cant,
              });
              this.guardarArray();
              this._toastService.success('Producto agregado al carrito');
            }
          });
        }
      },
      (error) => {
        console.log(error);
        this._toastService.error('Producto inexistente');
      },
    );
  }
  quitarProducto(id: any) {
    this.carrito.forEach((e) => {
      if (e.id == id) {
        if (this.total != 0) {
          this.total -= e.precio;
          e.cantidad -= 1;
          this.guardarArray();
        }
      }
      if (e.cantidad == 0) {
        const array = this.carrito.filter((producto) => producto.cantidad >= 1);
        this.carrito = array;
        this.guardarArray();
      }
      this._toastService.success('Producto quitado del carrito');
    });
  }
  limpiarCarrito() {
    localStorage.clear();
    this.carrito = [];
    this.total = 0;
  }
  comprarCarrito() {
    this._toastService.success('Felicidades Por Su Compra!!!!!');
    this.limpiarCarrito();
  }
  filtrar(filtro: any) {
    const productosFiltrados = this.auxProductos.filter(
      (producto) =>
        producto.categoria == filtro ||
        producto.talle_peso == filtro ||
        producto.precio < filtro,
    );
    this.listProductos = productosFiltrados;
  }
}
