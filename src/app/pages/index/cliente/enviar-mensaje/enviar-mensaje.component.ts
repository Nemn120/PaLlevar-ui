import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../../../_service/car-service.service';
import { DialogoConfirmacionComponent } from '../../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../../../_DTO/messageDTO';
import {  MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/_service/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ComplaintBean } from '../../../../_model/ComplaintBean';
import { ComplaintService } from 'src/app/_service/complaint.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.scss']
})
export class EnviarMensajeComponent implements OnInit {
  order:OrderBean;
  complaint: ComplaintBean;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  loadingSpinner:boolean=false;
 
  constructor(
    public dialog:MatDialog,public dialogo: MatDialogRef<EnviarMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private complaintService: ComplaintService,
    private sanitization: DomSanitizer,
   
  ) {

  }
 
 
   ngOnInit(): void {
     
    this.loadingSpinner=true;
    this.complaint = new ComplaintBean();
    this.complaint.orderId=this.data.id; 
    this.complaint.organizationId=this.data.organizationId;    
    this.complaint.userCreateId = this.data.userOrder.id;

   }

   enviarMensaje(){
    let ms = new Message();
    ms.title='Enviar reclamo o comentario'; 
    ms.description = '¿Está seguro de enviar el mensaje?';
    
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: ms
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado){

          if (this.selectedFiles != null) {
            this.currentFileUpload = this.selectedFiles.item(0);
          } else {
            this.currentFileUpload = new File([""], "blanco");
          }
         
          this.complaintService.saveComplaint(this.complaint, this.currentFileUpload).subscribe(data => {
              if (this.complaint.orderId)
                this.complaintService.mensajeCambio.next("Se actualizo");
              else
                this.complaintService.mensajeCambio.next("Se registro");
            
          },error =>{
            this.complaintService.mensajeCambio.next("Eror al mandar reclamo");
          });
          this.closeDialog();
          
          }
          setTimeout (x=>{
            this.dialog.closeAll();
          },2000);
  });

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

  closeDialog() {
    this.dialogo.close();
  }
}
