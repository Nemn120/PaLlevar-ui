
import { Component, OnInit, Inject } from '@angular/core';
import { ProductBean } from '../../../_model/ProductBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../_service/product.service';
import { CategoryProductService } from '../../../_service/category-product.service';
import { CategoryProductBean } from '../../../_model/CategoryProductBean';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../../_service/shared.service';

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

  categorias: CategoryProductBean[];

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,
    private productService: ProductService,
    private categoryProductService: CategoryProductService,
    private sanitization: DomSanitizer,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listarCategorias();
    this.productSelect = new ProductBean();
    if (this.data.id > 0) {
      this.productSelect.id = this.data.id;
      this.productSelect.name = this.data.name;
      this.productSelect.description = this.data.description;
      this.productSelect.categoryProduct = this.data.categoryProduct;
      this.productService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      });

    }
  }
  listarCategorias() {
    this.categoryProductService.getListCategoryProductByOrganization().subscribe(data => {
      this.categorias = data;
    });
  }

  save() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.productService.saveProduct(this.productSelect, this.currentFileUpload).subscribe(data => {
      this.productService.getListProductByOrganization().subscribe(data2 => {
        this.productService.productCambio.next(data2);
        if (this.productSelect.id)
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


