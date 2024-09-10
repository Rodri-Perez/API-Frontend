import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css',
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private _toastService: ToastrService
  ) {
    this.productoForm = this.fb.group({
      cod: ['', Validators.required],
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      talle_peso: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.editarProducto();
  }

  agregarProducto() {
    const PRODUCTO: Producto = {
      id: 0,
      cod: this.productoForm.get('cod')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      nombre: this.productoForm.get('nombre')?.value,
      talle_peso: this.productoForm.get('talle_peso')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      stock: this.productoForm.get('stock')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id !== null) {
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(
        (data) => {
          this._toastService.info('Producto editado correctamente');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this._toastService.error('Producto inexistente');
          this.productoForm.reset();
        }
      );
    } else {
      this._productoService.agregarProducto(PRODUCTO).subscribe(
        (data) => {
          this.router.navigate(['/']);
          this._toastService.success('Producto guardado correctamente');
        },
        (error) => {
          console.log(error);
          this._toastService.error('No se pudo guardar el producto');
          this.productoForm.reset();
        }
      );
    }
  }

  editarProducto() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
    }
    this._productoService.obtenerProducto(this.id).subscribe((data) => {
      this.productoForm.setValue({
        cod: data.cod,
        categoria: data.categoria,
        nombre: data.nombre,
        talle_peso: data.talle_peso,
        descripcion: data.descripcion,
        stock: data.stock,
        precio: data.precio,
      });
    });
  }
}
