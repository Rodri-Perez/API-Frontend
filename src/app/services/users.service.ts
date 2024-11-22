import { User } from './../models/user';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);

  url = 'https://api-backend-production-8a94.up.railway.app/api/v1/usuarios/';
  urlLogin = 'https://api-backend-production-8a94.up.railway.app/api/v1/usuarios/?Email=';

  getUsers(): Observable<any> {
    return this._http.get(this.url);
  }

  getUser(id: string): Observable<any> {
    console.log(this.url + id);
    return this._http.get(this.url + id);
  }
  postUser(usuario: User): Observable<any> {
    return this._http.post(this.url, usuario);
  }
  async getUserByEmail(Email: string) {
    const response = this._http.get(this.urlLogin + Email).toPromise();
    return response as Promise<User[] | undefined>;
  }
}
