import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductBean } from '../../../_model/ProductBean';
import { MatSort } from '@angular/material/sort';
import { Message } from '../../../_DTO/messageDTO';
import { MatPaginator } from '@angular/material/paginator';
import { ProductFormComponent } from '../product-form/product-form.component';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'description', 'category', 'actions'];
  dataSource: MatTableDataSource<ProductBean>;/// tabla 
  titleProductList: string;

  constructor
    (
      public dialogo: MatDialog,
      private productService: ProductService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    this.titleProductList="Listar Productos";
    this.productService.mensajeCambio.subscribe(data => { // cuando actualizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.productService.productCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productService.getListProductByOrganization().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, error => {
      this.productService.mensajeCambio.next("Error al mostrar productos");
    });

  }
  public openDialog(product?: ProductBean) {
    let productSelect = product != null ? product : new ProductBean();
    this.dialog.open(ProductFormComponent, {
      width: '600',
      height: '600',
      data: productSelect
    });
  }
  public delete(product: ProductBean) {
    let ms = new Message();
    ms.title='Borrar producto'; 
    ms.description = '¿Esta seguro de borrar el producto?';
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: ms
      }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if(confirmado){
          this.productService.deleteProduct(product.id).subscribe(data => {
            this.productService.getListProductByOrganization().subscribe(data => {
              this.productService.productCambio.next(data);
              this.productService.mensajeCambio.next("Se elimino con éxito");
            }, error => {
              console.error(error);
              this.productService.mensajeCambio.next("Error al mostrar listado de productos");
            });
          }, error => {
            console.error(error);
            this.productService.mensajeCambio.next("No eliminado");
          });
        }
      });
    
  }

}


