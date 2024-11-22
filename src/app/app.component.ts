import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'cliente';
  home = '';
  listaProductos = '';
  perfil = '';
  session: boolean | null = null;
  idUser = '';
  nameUser = '';
  auth = false;
  reload: boolean | null = null;

  constructor(private router: Router) {}

  logeado() {
    if (this.session) {
      this.home = '/user/' + this.idUser;
      this.listaProductos = '/listar-productos/user/' + this.idUser;
      this.perfil = '/usuario/' + this.idUser;
    } else {
      this.listaProductos = '/listar-productos';
    }
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }
  //! Recuperar la session
  recuperarSesion() {
    const sessionGuardado = localStorage.getItem('session');
    const idUserGuardado = localStorage.getItem('idUser');
    const UserGuardado = localStorage.getItem('nameUser');

    if (sessionGuardado) {
      this.session = Boolean(sessionGuardado);
    }
    if (idUserGuardado) {
      this.idUser = String(idUserGuardado);
    }
    if (UserGuardado) {
      this.nameUser = String(UserGuardado);
    }
  }
  Reload() {
    if (this.session) {
      this.reload = false;
      this.router.navigate(['/user/' + this.idUser]);
    }
  }
  ngOnInit(): void {
    this.recuperarSesion();
    this.logeado();
    this.Reload();
  }
}
