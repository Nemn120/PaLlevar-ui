import { CategoryProductBean } from './../../../../_model/CategoryProductBean';
import { CategoryProductService } from './../../../../_service/category-product.service';

import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  
  categoryProductSelect: CategoryProductBean;
  
  constructor(
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryProductBean,
    private categoryProductService: CategoryProductService,
  ) { }

  ngOnInit(): void {
    this.categoryProductSelect = new CategoryProductBean();
    if (this.data.id > 0) {
      this.categoryProductSelect.id = this.data.id;
      this.categoryProductSelect.name = this.data.name;
      this.categoryProductSelect.description = this.data.description;
      this.categoryProductSelect.pathPhoto = null;
      //FALTA GUARDAR FOTO

    }
  }
  save(){
    this.categoryProductService.saveCategoryProduct(this.categoryProductSelect).subscribe(data => {
      this.categoryProductService.getListCategoryProduct().subscribe(data2 => {
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


}
