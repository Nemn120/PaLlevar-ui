
import { Component, OnInit, Inject } from '@angular/core';
import { ProductBean } from '../../../_model/ProductBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../_service/product.service';
import { CategoryProductService } from '../../../_service/category-product.service';
import { CategoryProductBean } from '../../../_model/CategoryProductBean';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productSelect: ProductBean;

  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  
  categorias: CategoryProductBean[] ;
  
  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,
    private productService: ProductService,
    private categoryProductService:CategoryProductService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.listarCategorias();    
    this.productSelect = new ProductBean();
    if (this.data.id > 0) {
      this.productSelect.id = this.data.id;
      this.productSelect.name = this.data.name;
      this.productSelect.description = this.data.description;
      this.productSelect.categoryProduct=this.data.categoryProduct;

    }
  }
  listarCategorias(){
    this.categoryProductService.getListCategoryProduct().subscribe(data => {
      this.categorias=data;
    });
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

  selectFile(e: any) {
    console.log(e);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
    
  }
      
}


