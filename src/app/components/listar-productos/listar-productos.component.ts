import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgFor, NgIf } from '@angular/common';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, ToastrModule],
  providers: [CargarScriptsService],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css',
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(
    private _cargaScripts: CargarScriptsService,
    private __productoService: ProductoService,
    private _toastService: ToastrService
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
      }
    );
  }
}
