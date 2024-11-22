import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../services/compras.service';
import { UserService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { compras } from '../../models/compras';
import { User } from '../../models/user';
import { NgFor } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Historial } from '../../models/historial';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  producto: Producto | null = null;
  allCompras: compras[] = [];
  userCompras: Historial[] = [];
  id: string;
  constructor(
    private _compras: ComprasService,
    private _user: UserService,
    private _producto: ProductoService,
    private aRouter: ActivatedRoute,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  obtenerUsuario() {
    this._user.getUser(this.id).subscribe((data) => {
      this.user = data;
    });
  }

  obtenerCompras() {
    this._compras.getCompras().subscribe((data) => {
      this.allCompras = data;
      for (const compra of this.allCompras) {
        console.log(typeof compra.Fecha_Compra);
        this._producto.obtenerProducto(compra.Id_Producto).subscribe((data) => {
          this.producto = data;
          if (compra.Id_user == this.id) {
            this.userCompras.push({
              id: data.id_producto,
              nombre: data.nombre,
              cantidad: compra.Cantidad,
              fecha: compra.Fecha_Compra,
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerCompras();
  }
}
