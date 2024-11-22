import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Carrito } from '../../models/carrito';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComprasService } from '../../services/compras.service';
import { compras } from '../../models/compras';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    ToastrModule,
    ReactiveFormsModule,
    NgClass,
  ],
  providers: [CargarScriptsService],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css',
})
export class ListarProductosComponent implements OnInit {
  //| Variables globales de listado de productos
  auth = false;
  styleProduct = false;
  carrito: Carrito[] = [];
  productoCarrito: Producto[] = [];
  aux: Producto[] = [];
  aux_carrito = {};
  cant = 1;
  listProductos: Producto[] = [];
  auxProductos: Producto[] = [];

  //| Variables Globales de Tarjeta
  fechaActual = new Date();
  añoActual = this.fechaActual.getFullYear();
  tarjetaForm: FormGroup;
  Tarjeta = '5547306978054880';
  years: number[] = [];
  meses: number[] = [];

  total = 0;
  idUser = '';
  session: boolean | null = null;

  constructor(
    private _cargaScripts: CargarScriptsService,
    private __productoService: ProductoService,
    private _comprar: ComprasService,
    private _toastService: ToastrService,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) {
    _cargaScripts.carga(['js/dinamic']);
    //! Formulario de tarjeta
    this.tarjetaForm = this.fb.group({
      cardNumber: ['', Validators.required],
      fullname: ['', Validators.required],
      cod: ['', Validators.required],
      month: ['1', Validators.required],
      year: [this.añoActual, Validators.required],
    });
  }

  //! Funcion que se ejecuta al cargar la pagina
  ngOnInit(): void {
    this.obtenerProductos();
    this.recuperarArray();
    this.recuperarSesion();
    this.iterarMesAño();
  }

  //! Guardar lo que haya en el carrito por si se recarga la pagina
  guardarArray() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    localStorage.setItem('total', String(this.total));
    console.log(localStorage.getItem('carrito'));
  }

  //! Recuperar lo que habia en el carrito
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

  //! Recuperar la session
  recuperarSesion() {
    const sessionGuardado = localStorage.getItem('session');
    const idUserGuardado = localStorage.getItem('idUser');
    if (sessionGuardado) {
      this.session = Boolean(sessionGuardado);
    }
    if (idUserGuardado) {
      this.idUser = String(idUserGuardado);
    }
  }

  //! Obtener todos los productos
  obtenerProductos() {
    this.__productoService.getAllProductos().subscribe((data) => {
      this.listProductos = data;
      this.auxProductos = data;
    });
  }

  //! Eliminar un producto

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

  //! Agregar un producto del carrito

  agregarProducto(id: any) {
    this.__productoService.obtenerProducto(id).subscribe(
      (data) => {
        if (this.carrito.length == 0) {
          this.total += data.precio;
          this.carrito.push({
            id: data.id_producto,
            nombre: data.nombre,
            precio: data.precio,
            cantidad: this.cant,
          });
          this._toastService.success('Producto agregado al carrito');
          this.guardarArray();
        } else {
          this.carrito.forEach((e) => {
            if (e.id == data.id_producto) {
              this.total += data.precio;
              e.cantidad += 1;
              this._toastService.success('Producto agregado al carrito');

              this.guardarArray();
            } else if (
              !this.carrito.some((producto) => producto.id == data.id_producto)
            ) {
              this.total += data.precio;
              this.carrito.push({
                id: data.id_producto,
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

  //! Quitar un producto del carrito

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

  //! Limpiar el carrito completo

  limpiarCarrito() {
    localStorage.clear();
    this.carrito = [];
    this.total = 0;
  }

  //! Coomprar carrito agregando una clase para que de la tarjeta

  comprarCarrito() {
    this.styleProduct = true;
  }

  //! Filtrar listado de productos

  filtrar(filtro: any) {
    const productosFiltrados = this.auxProductos.filter(
      (producto) =>
        producto.categoria == filtro ||
        producto.talle_peso == filtro ||
        producto.precio < filtro,
    );
    this.listProductos = productosFiltrados;
  }

  //! Iteracion de años desde el actual para el vencimineto de la tarjeta

  iterarMesAño() {
    for (let i = 0; i < 12; i++) {
      this.years[i] = this.añoActual + i;
      this.meses[i] = i + 1;
    }
  }

  //! Metodo LUHN para la validacion de la tarjeta de credito

  luhmMethod(card: string): boolean {
    const cardNumber = card.replace(/\s+/g, '');
    const digitos = cardNumber.split('').map((char) => parseInt(char));

    if (digitos.length == 16) {
      let sum = 0;
      for (let i = digitos.length - 2; i >= 0; i -= 2) {
        let digito = digitos[i] * 2;
        if (digito > 9) {
          digito -= 9;
        }
        sum += digito;
      }

      for (let i = digitos.length - 1; i >= 0; i -= 2) {
        sum += digitos[i];
      }

      return sum % 10 === 0;
    } else {
      return false;
    }
  }

  //! Resto de validaciones para la tarjeta (numero, codigo y vencimiento)

  validarTarjeta() {
    const cardNumber = this.tarjetaForm.get('cardNumber')?.value;
    const month = this.tarjetaForm.get('month')?.value;
    const year = this.tarjetaForm.get('year')?.value;
    const cod = this.tarjetaForm.get('cod')?.value;

    if (year != this.fechaActual.getFullYear()) {
      if (
        this.luhmMethod(cardNumber) &&
        year > this.fechaActual.getFullYear() &&
        cod.length > 2 &&
        cod.length < 5 &&
        !!/^\d+$/.test(cod)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (month < this.fechaActual.getMonth()) {
        return false;
      } else if (
        this.luhmMethod(cardNumber) &&
        cod.length > 2 &&
        cod.length < 5 &&
        !!/^\d+$/.test(cod)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  //! Funcion para pagar los productos solicitados

  comprar() {
    const day = this.fechaActual.getDate();
    const month = this.fechaActual.getMonth() + 1;
    const year = this.fechaActual.getFullYear();
    const time = String(year + '-' + month + '-' + day);

    if (this.validarTarjeta()) {
      this.carrito.forEach((prod) => {
        const compra: compras = {
          Id_Compra: 0,
          Id_user: this.aRouter.snapshot.paramMap.get('id')!,
          Cantidad: prod.cantidad,
          Id_Producto: prod.id,
          Fecha_Compra: time.toString().split('T')[0],
          id_pago: 1,
        };
        this._comprar.postCompras(compra).subscribe(
          () => {
            this._toastService.success('Felicidades Por Su Compra!!!!!');
            this.router.navigate([
              'resumen/' + this.aRouter.snapshot.paramMap.get('id')!,
            ]);
          },
          (error) => {
            console.log(error);
            this._toastService.error('No se pudo realizar la compra');
          },
        );
      });
      this.limpiarCarrito();
    } else {
      this._toastService.error('Tarjeta no aceptada');
    }
  }
}
