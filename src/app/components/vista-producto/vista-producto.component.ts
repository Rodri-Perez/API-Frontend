import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vistaproducto',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './vista-producto.component.html',
  styleUrl: './vista-producto.component.css',
})
export class VistaProductoComponent implements OnInit {
  title = 'po';
  producto!: Producto;
  id: string;
  constructor(
    private _cargaScripts: CargarScriptsService,
    private router: Router,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private _toastService: ToastrService,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
    _cargaScripts.carga(['js/dinamic']);
  }

  obtenerProducto(id: string) {
    this._productoService.obtenerProducto(id).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  ngOnInit(): void {
    this.obtenerProducto(this.id);
  }
}
