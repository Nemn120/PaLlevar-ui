import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserBean } from 'src/app/_model/UserBean';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UserService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.maxFecha = new Date();

    this.form = this.fb.group({
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'fechaNac': new Date(),
      usuario: new FormControl(''),
      password: [''],
      confirmPassword: ['']
    }, {
        //validator: PasswordValidation.MatchPassword
      });
  }

  registrar() {
    let cliente = new UserBean();
    /*
    cliente.nombre = this.form.value['nombres'];
    cliente. = this.form.value['apellidos'];
    cliente.dni = this.form.value['dni'];
    cliente.fechaNac = this.form.value['fechaNac'];

    let usuario = new UserBean();
    usuario.nombre = this.form.value['usuario'];
    usuario.clave = this.form.value['password'];
    usuario.estado = true;
    usuario.cliente = cliente;
    */

    this.usuarioService.registrar(cliente).subscribe(() => {
      this.matSnackBar.open('Registro completado con éxito', 'SUCCESS', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['auth/login']);
      }, 1500);
    });
  }


}
