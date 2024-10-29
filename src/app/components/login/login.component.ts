import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @NgModule({
    imports: [HttpClientModule],
  })
  usuario: User[] = [];
  constructor(private user_http: UserService) {}
  obtenerUsuario() {
    this.user_http.getUser().subscribe((data) => {
      this.usuario = data;
    });
  }
}
