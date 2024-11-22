import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import * as uuid from 'uuid';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css',
})
export class SigInComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private user_http: UserService,
    private _toastService: ToastrService,
  ) {
    this.userForm = this.fb.group({
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      password_auth: ['', Validators.required],
    });
  }
  get passwordValue() {
    return this.userForm.get('Password');
  }
  get passwordConfirmValue() {
    return this.userForm.get('password_auth');
  }

  agregarUsuario() {
    const USUARIO: User = {
      Id_Usuario: uuid.v4(),
      Username: this.userForm.get('Username')?.value,
      Email: this.userForm.get('Email')?.value,
      Password: this.userForm.get('Password')?.value,
    };
    console.log(USUARIO);
    this.user_http.postUser(USUARIO).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/']);
        this._toastService.success('Usuario registrado correctamente');
      },
      (error) => {
        console.log(error);
        this._toastService.error('No se pudo registrar al usuario');
        this.userForm.reset();
      },
    );
  }
}
