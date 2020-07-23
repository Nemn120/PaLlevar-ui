import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form.component';
import { UserService } from 'src/app/_service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-dialog-foto',
  templateUrl: './dialog-foto.component.html',
  styleUrls: ['./dialog-foto.component.scss']
})
export class DialogFotoComponent implements OnInit {

  imagenData: any;
  imagenEstado = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  loadingSpinner = false;
  private sanitization: DomSanitizer;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private serviceUser: UserService) {}

  ngOnInit(): void {
    if(this.currentFileUpload != null) {
      this.imagenData = this.convertir(this.currentFileUpload);
      console.log(this.imagenData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(e: any) {
    console.log(e);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

  save() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([''], 'blanco');
    }
    this.serviceUser.imagen = this.currentFileUpload;
    this.onNoClick();
    console.log(this.currentFileUpload);
  }

  public convertir(data: any) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const base64 = reader.result;
      this.sanar(base64);
    }
  }

  public sanar(base64 : any){
    this.imagenData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado=true;
  }

}
