import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly _http = inject(HttpClient);

  url = 'http://localhost:8000/api/v1/productos/';

  getAllProductos(): Observable<any> {
    return this._http.get(this.url);
  }

  getAllByTalle(talle_peso: string): Observable<any> {
    return this._http.get(this.url = talle_peso);
  }

  eliminarProducto(id: string): Observable<any> {
    return this._http.delete(this.url + id + '/');
  }

  agregarProducto(producto: Producto): Observable<any> {
    return this._http.post(this.url, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this._http.get(this.url + id + '/');
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this._http.put(this.url + id + '/', producto);
  }
}
