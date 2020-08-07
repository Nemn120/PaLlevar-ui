import { SharedService } from '../../../_service/shared.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../_service/user.service';
import { UserBean } from 'src/app/_model/UserBean';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private sanitization: DomSanitizer,
    private sharedService: SharedService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.maxFecha = new Date();
    this.userSelect = new UserBean();
    if (this.sharedService.userSession.id > 0) {

      this.userSelect=this.sharedService.userSession;
   
       this.userService.getPhotoById(this.sharedService.userSession.id).subscribe(data => {
         if (data.size > 0)
           this.imagenData = this.convertir(data);
       });
 
     }
  }

  


  userSelect: UserBean;  
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: String;

  usuario: UserBean;
  maxFecha: Date;

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;      
      this.sanar(base64);
    }
  }
  public sanar(base64 : any){
    this.imagenData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado=true;
  }

  save(){
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.userService.actualizarPerfil(this.userSelect,this.currentFileUpload).subscribe(data => {
     
        this.userService.mensajeCambio.next("Se actualizo");
        
    });
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selectFile(e: any) {
    console.log(e);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

}
