import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../../services/compras.service';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { Producto } from '../../models/producto';
import { compras } from '../../models/compras';
import { Historial } from '../../models/historial';
import { ProductoService } from '../../services/producto.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [NgFor],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css',
})
export class ResumenComponent implements OnInit {
  fechaActual = new Date();

  userId: string;
  user: User | null = null;
  producto: Producto | null = null;
  compra: compras[] = [];
  userCompras: Historial[] = [];
  constructor(
    private aRouter: ActivatedRoute,
    private _compras: ComprasService,
    private _producto: ProductoService,
    private _user: UserService,
  ) {
    this.userId = this.aRouter.snapshot.paramMap.get('user')!;
  }

  obtenerUsuario() {
    this._user.getUser(this.userId).subscribe((data) => {
      this.user = data;
    });
  }

  obtenerCompras() {
    const day = this.fechaActual.getDate();
    const month = this.fechaActual.getMonth() + 1;
    const year = this.fechaActual.getFullYear();
    const time = String(year + '-' + month + '-' + day);
    this._compras.getCompras().subscribe((data) => {
      this.compra = data;
      for (const compra of this.compra) {
        if (compra.Fecha_Compra == time) {
          this._producto
            .obtenerProducto(compra.Id_Producto)
            .subscribe((data) => {
              this.producto = data;
              if (compra.Id_user == this.userId) {
                this.userCompras.push({
                  id: data.id_producto,
                  nombre: data.nombre,
                  cantidad: compra.Cantidad,
                  fecha: compra.Fecha_Compra,
                });
              }
            });
        }
      }
    });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerCompras();
  }
}
