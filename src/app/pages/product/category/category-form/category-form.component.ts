import { CategoryProductBean } from './../../../../_model/CategoryProductBean';
import { CategoryProductService } from './../../../../_service/category-product.service';

import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  
  categoryProductSelect: CategoryProductBean;

  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  
  constructor(
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryProductBean,
    private categoryProductService: CategoryProductService,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.categoryProductSelect = new CategoryProductBean();
    if (this.data.id > 0) {
      this.categoryProductSelect.id = this.data.id;
      this.categoryProductSelect.name = this.data.name;
      this.categoryProductSelect.description = this.data.description;
      this.categoryProductSelect.pathPhoto = null;
      this.categoryProductService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      });

    }
  }
  save(){
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.categoryProductService.saveCategoryProduct(this.categoryProductSelect,this.currentFileUpload).subscribe(data => {
      this.categoryProductService.getListCategoryProductByOrganization().subscribe(data2 => {
        this.categoryProductService.ompanyCambio.next(data2);
        if(this.categoryProductSelect.id)
        this.categoryProductService.mensajeCambio.next("Se actualizo");
        else
        this.categoryProductService.mensajeCambio.next("Se registro");
      });
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
