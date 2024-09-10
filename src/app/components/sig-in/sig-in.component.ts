import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

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
    private _toastService: ToastrService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_auth: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarUsuario() {
    const USUARIO: User = {
      id: 0,
      nombre: this.userForm.get('nombre')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    };
  }
}
