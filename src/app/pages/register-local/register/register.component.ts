import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  miFormulario : FormGroup = this.formBuilder.group({
    localName: ['',[Validators.required]],
    localDescription: ['',[Validators.required]],
    localAddress: ['',[Validators.required]],
    businessName: ['',[Validators.required]],
    ruc: ['',[Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
    estimatedTime: ['',[Validators.required]],
    userName: ['',[Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['',[Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    aniversaryDate: ['',[Validators.required]],
    responsable: ['', [Validators.required]],
    responsablePhone: ['',[Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    responsableEmail: ['',[Validators.required, Validators.email]]
  })

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('responsableEmail')?.errors;
    if (errors?.required) {
      return 'Email es Obligatorio'
    } else if (errors?.email) {
      return 'No tiene formato de correo'
    } 
    return ''
  }

  createLocal(){
    if(!this.miFormulario.valid){
      console.log("hola")
      this.miFormulario.markAllAsTouched();
      return;
    }
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched 
  }
}
