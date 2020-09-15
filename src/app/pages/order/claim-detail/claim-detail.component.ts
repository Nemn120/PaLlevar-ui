import { Component, OnInit, Inject } from '@angular/core';
import { ComplaintBean } from 'src/app/_model/ComplaintBean';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplaintService } from 'src/app/_service/complaint.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {

  complaintSelect: ComplaintBean;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  loadingSpinner:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ComplaintBean, private snackBar: MatSnackBar,
  private complaintService:ComplaintService,private sanitization: DomSanitizer,) { }

  ngOnInit(): void {
    this.loadingSpinner=true;
    this.complaintSelect= new ComplaintBean();
    if (this.data.id > 0) {
      this.complaintSelect.id = this.data.id;
      this.complaintSelect.titulo = this.data.titulo;
      this.complaintSelect.description=this.data.description;
      this.complaintSelect.userCreateId = this.data.userCreateId;
      this.complaintService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      });

    }
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

  public sanar(base64 : any){
    this.imagenData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado=true;
  }
}
