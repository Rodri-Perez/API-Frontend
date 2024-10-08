import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgFor, NgIf } from '@angular/common';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'appvistaproducto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vista-producto.component.html',
  styleUrl: './vista-producto.component.css'
})
export class VistaProductoComponent {
 title =  "po"
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
}
