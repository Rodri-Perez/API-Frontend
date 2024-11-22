import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { compras } from '../models/compras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private readonly _http = inject(HttpClient);
  compras = compras;
  url = 'https://api-backend-production-8a94.up.railway.app/api/v1/compras/';

  getCompras(): Observable<any> {
    return this._http.get(this.url);
  }
  obtenerCompra(id: string): Observable<any> {
    return this._http.get(this.url + id + '/');
  }
  postCompras(compras: compras): Observable<any> {
    return this._http.post(this.url, compras);
  }
}
