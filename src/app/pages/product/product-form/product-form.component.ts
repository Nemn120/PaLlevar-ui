import { Component, OnInit, Inject } from '@angular/core';
import { ProductBean } from '../../../_model/ProductBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../_service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productSelect: ProductBean;
  
  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productSelect = new ProductBean();
    if (this.data.id > 0) {
      this.productSelect.id = this.data.id;
      this.productSelect.name = this.data.name;
      this.productSelect.description = this.data.description;

    }
  }
  save(){
    this.productService.saveProduct(this.productSelect).subscribe(data => {
      this.productService.getListProduct().subscribe(data2 => {
        this.productService.productCambio.next(data2);
        if(this.productSelect.id)
        this.productService.mensajeCambio.next("Se actualizo");
        else
        this.productService.mensajeCambio.next("Se registro");
      });
    });
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
