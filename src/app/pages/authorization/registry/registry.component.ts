import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserBean } from 'src/app/_model/UserBean';
import { PasswordValidation } from './match';
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
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'dni': new FormControl(''),
      'fechaNac': new Date(),
      usuario: new FormControl(''),
      password: [''],
      confirmPassword: ['']
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

  registrar() {
    let newUser = new UserBean();
    
    newUser.nombre = this.form.value['nombres'];
    newUser.lastName = this.form.value['apellidos'];
    newUser.documentNumber = this.form.value['dni'];
    newUser.dateBirth = this.form.value['fechaNac'];
    newUser.username = this.form.value['usuario'];
    newUser.password = this.form.value['password'];
    newUser.cellPhone = this.form.value['telefono'];
    newUser.address = this.form.value['direccion'];


    this.usuarioService.registrar(newUser).subscribe(() => {
      this.matSnackBar.open('Registro completado con éxito', 'SUCCESS', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['auth/login']);
      }, 1500);
    });
  }


}
