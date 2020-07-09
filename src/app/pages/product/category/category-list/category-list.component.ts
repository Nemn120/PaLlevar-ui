import { Component, OnInit ,ViewChild} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryProductBean } from '../../../../_model/CategoryProductBean';
import { CategoryProductService } from '../../../../_service/category-product.service';
import { CategoryFormComponent } from '../category-form/category-form.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'description','pathPhoto','actions'];
  dataSource: MatTableDataSource<CategoryProductBean>;/// tabla 
  titleCategoryProductList: string;
  constructor(
    private categoryProductService:CategoryProductService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleCategoryProductList="Listar Categorias";
    this.categoryProductService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.categoryProductService.ompanyCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.categoryProductService.getListCategoryProduct().subscribe(data => {
    //this.productService.getListProductByOrganization().subscribe(data => {  
    //this.productService.getListProductByOrganizationAndSucursal().subscribe(data => {  
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });

  }
  public openDialog(categoryProduct: CategoryProductBean) {
    let productSelect = categoryProduct != null ? categoryProduct : new CategoryProductBean();
    this.dialog.open(CategoryFormComponent, {
      width: '600',
      height: '600',
      data: productSelect
    });
  }
  public delete(categoryProduct:CategoryProductBean){
      this.categoryProductService.deleteCategoryProduct(categoryProduct.id).subscribe(data => {
        this.categoryProductService.getListCategoryProduct().subscribe(data => {
          this.categoryProductService.ompanyCambio.next(data);
          this.categoryProductService.mensajeCambio.next("Se elimino con éxito");
        });
      });
    }

}
