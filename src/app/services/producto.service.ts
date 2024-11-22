import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly _http = inject(HttpClient);

  url = 'https://api-backend-production-8a94.up.railway.app/api/v1/productos/';

  getAllProductos(): Observable<any> {
    return this._http.get(this.url);
  }

  eliminarProducto(id: string): Observable<any> {
    return this._http.delete(this.url + id + '/');
  }

  agregarProducto(producto: Producto): Observable<any> {
    return this._http.post(this.url, producto);
  }

  obtenerProducto(id: number): Observable<any> {
    return this._http.get(this.url + id + '/');
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this._http.put(this.url + id + '/', producto);
  }
}
