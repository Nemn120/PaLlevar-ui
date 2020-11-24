import { Component, OnInit } from '@angular/core';
import { UserBean } from 'src/app/_model/UserBean';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/_service/shared.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-edit-add-profile',
  templateUrl: './edit-add-profile.component.html',
  styleUrls: ['./edit-add-profile.component.scss']
})
export class EditAddProfileComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditAddProfileComponent>,
    private snackBar: MatSnackBar,
    private sanitization: DomSanitizer,
    private sharedService: SharedService,
    private addUserService: UserService
  ) { }

  addUserSelect: UserBean;
  imageData: any;
  imageState: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  addUser: UserBean;
  maxFecha: Date;


  ngOnInit(): void {
    this.maxFecha=new Date();

    this.addUserSelect = new UserBean();
    if (this.sharedService.userSession.id > 0) {

     this.addUserSelect=this.sharedService.userSession;
  
      this.addUserService.getPhotoById(this.sharedService.userSession.id).subscribe(data => {
        if (data.size > 0)
          this.imageData = this.convertir(data);
      });

    }
  }

  Save(){
    if(this.selectedFiles != null){
      this.currentFileUpload = this.selectedFiles.item(0);
    }else{
      this.currentFileUpload = new File([""], "blanco");
    }
    this.addUserService.actualizarPerfil(this.addUserSelect, this.currentFileUpload).
    subscribe(data => {this.snackBar.open(data.message, 'SUCCESS', {duration: 5000});});
    this.CloseDialog();
  }

  CloseDialog() {
    this.dialogRef.close();
  }

  SelectFile(e: any) {
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

  public sanar(base64 : any){
    this.imageData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imageState=true;
  }

}
