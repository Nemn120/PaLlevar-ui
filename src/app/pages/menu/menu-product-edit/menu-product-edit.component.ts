import { Component, OnInit, Inject } from '@angular/core';
import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { MenuDayProductService } from '../../../_service/menu-day-product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuDayService } from '../../../_service/menu-day.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-product-edit',
  templateUrl: './menu-product-edit.component.html',
  styleUrls: ['./menu-product-edit.component.scss']
})
export class MenuProductEditComponent implements OnInit {

  menuProductSelect : MenuDayProductBean
  estados: string[] = ['Disponible', 'No disponible'];
  status:String="";

  constructor(
    private menuDayProductService : MenuDayProductService,
    private menuDayService : MenuDayService,
    private dialogRef: MatDialogRef<MenuProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuDayProductBean,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.menuProductSelect= new MenuDayProductBean();
    if(this.data.id){
      this.status=this.data.status;
      this.menuProductSelect.id=this.data.id;
      this.menuProductSelect.status=this.data.status;
      this.menuProductSelect.type=this.data.type;
      this.menuProductSelect.menuDayId=this.data.menuDayId;
      this.menuProductSelect.userCreateId=this.data.userCreateId;
      this.menuProductSelect.quantity=this.data.quantity;
      this.menuProductSelect.product=this.data.product;
      this.menuProductSelect.available=this.data.available;
      this.menuProductSelect.organizationId=this.data.organizationId;
      this.menuProductSelect.price=this.data.price;
    }
  }
  save(){
  if(this.checkChangeStatus()){
    this.menuDayProductService.saveMenuDayProduct(this.menuProductSelect).subscribe(data=>{
      this.menuDayService.getMenuDayById(this.menuProductSelect.menuDayId).subscribe(data2 =>{
        this.menuDayService.menuDayOneCambio.next(data2)
        this.menuDayService.mensajeCambio.next(data.message);
      }, error =>{
        console.error(error);
      })
      this.dialogRef.close();    

    });
  }else{
    this.snackBar.open("Por favor agrege una cantidad si desea cambiar el estado a DISPONIBLE",'INFO', { duration: 5000 });
  }
  }

  checkChangeStatus():boolean{
    if(this.status == "No disponible" && this.menuProductSelect.status == "Disponible"){
      if(this.menuProductSelect.available == 0  && this.menuProductSelect.quantityAdd== 0 ){
        return false;
      }
      if(this.menuProductSelect.available != 0  && this.menuProductSelect.quantityAdd== 0 ){
        return true;
      }

    }
      return true;
  }
  
  close(){
    this.dialogRef.close();    

  }
}
