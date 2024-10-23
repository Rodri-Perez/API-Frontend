import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @NgModule({
    imports: [
      HttpClientModule,
    ],
  })
  usuario: User[] = [];
  ngOnInit(): void {}
  constructor(  
    private user_http: UserService,
  ){
  }
  obtenerUsuario(){
    this.user_http.getUser().subscribe((data) => {
      this.usuario = data;
    });
  }
}
