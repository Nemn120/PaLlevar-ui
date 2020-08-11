import { SharedService } from './../../../../_service/shared.service';
import { Component, OnInit, Inject } from '@angular/core';
import { CategoryProductBean } from './../../../../_model/CategoryProductBean';
import { CategoryProductService } from './../../../../_service/category-product.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../../_service/user.service';
import { UserBean } from 'src/app/_model/UserBean';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {


  userSelect: UserBean;

  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;


  usuario: UserBean;
  maxFecha: Date;
  constructor(
    private dialogRef: MatDialogRef<EditarPerfilComponent>,
    private snackBar: MatSnackBar,
    private sanitization: DomSanitizer,
    private sharedService: SharedService,
    private userService: UserService

  ) { }


  ngOnInit(): void {
    this.maxFecha = new Date();

    this.userSelect = new UserBean();
    if (this.sharedService.userSession.id > 0) {

      this.userSelect = this.sharedService.userSession;

      this.userService.getPhotoById(this.sharedService.userSession.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      });

    }
  }

  save() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.userService.actualizarPerfil(this.userSelect, this.currentFileUpload).subscribe(data => {
      this.snackBar.open(data.message, 'SUCESS', { duration: 5000 });
    }), error => {
      this.snackBar.open(error.message, 'SUCESS', { duration: 5000 });
    };
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }
  public sanar(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }




}
