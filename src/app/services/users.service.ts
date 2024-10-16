import { User } from './../models/user';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);
  user = User;
  url = 'http://localhost:8000/';

  getUser(): Observable<any> {
    return this._http.get(this.url);
  }
  postUser(usuario: User): Observable<any> {
    return this._http.post(this.url, usuario);
  }
}
