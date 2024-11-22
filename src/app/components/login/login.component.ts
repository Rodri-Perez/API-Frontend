import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { NgIf, ɵnormalizeQueryParams } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usuario: User | null = null;
  nameUser = '';
  session: boolean | null = null;
  idUser = '';
  reload: boolean | null = null;
  constructor(
    private user_http: UserService,
    private _toastService: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const user = await this.user_http.getUserByEmail(email);

    if (!user || user.length == 0) {
      alert('No hay usuario');
      return;
    }

    if (user[0].Password == password) {
      this.session = true;
      this.idUser = String(user[0].Id_Usuario);
      this.nameUser = user[0].Username;
      this.reload = true;
      console.log(this.reload);
      this.guardarSesion();
      window.location.reload();
    } else {
      alert('Correo o contraseña no validos');
    }
  }

  Reload() {
    if (this.session) {
      this.reload = false;
      this.router.navigate(['/user/' + this.idUser]);
    }
  }

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

  guardarSesion() {
    localStorage.setItem('session', String(this.session));
    localStorage.setItem('idUser', String(this.idUser));
    localStorage.setItem('nameUser', String(this.nameUser));
  }

  ngOnInit(): void {
    this.recuperarSesion();
    this.Reload();
  }
}
