import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetailService } from '../../../_service/order-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductBean } from '../../../_model/ProductBean';
import { CategoryProductBean } from '../../../_model/CategoryProductBean';
import { MenuDayBean } from '../../../_model/MenyDayBean';
import { ProductService } from '../../../_service/product.service';
import { CategoryProductService } from '../../../_service/category-product.service';
import { MenuDayService } from '../../../_service/menu-day.service';
import { SearchSalesByFieldsDTO } from '../../../_DTO/SearchSalesByFieldsDTO';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trade-order',
  templateUrl: './trade-order.component.html',
  styleUrls: ['./trade-order.component.scss']
})
export class TradeOrderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'productName', 'categoryName','price','countSales','sumSales'];
  dataSource: MatTableDataSource<any>;/// tabla 
  titleProductList: string;

  productList:Array<ProductBean>=[];
  categoryProductList:Array<CategoryProductBean>=[];
  menuDayList:Array<MenuDayBean>=[];
  searchSalesDTO:SearchSalesByFieldsDTO;
  myControl = new FormControl();
  filteredProductOptions: Observable<ProductBean[]>;
  resultSalesList:any[]=[];
  constructor(
    private orderDetailService:OrderDetailService, private dialog:MatDialog, private snackBar: MatSnackBar,
    private router:Router,private productService:ProductService, private categoryProductService:CategoryProductService,
    private menuDayService:MenuDayService
  ) { }

  ngOnInit(): void {
    this.searchSalesDTO = new SearchSalesByFieldsDTO()
    this.searchSalesDTO.initDate= new Date(2020,0,1);
    this.searchSalesDTO.finalDate = new Date();
    this.productService.getListProductByOrganization().subscribe(data =>{
      this.productList=data;
      this.categoryProductService.getListCategoryProductByOrganization().subscribe(data =>{

        this.categoryProductList=data;
        this.search();

      }, error =>{
      })  
    }, error =>{
    })
    this.filteredProductOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.productList.slice())
    );
  }
  private _filter(name: string): ProductBean[] {
    const filterValue = name.toLowerCase();

    return this.productList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  itemSelected(event: MatAutocompleteSelectedEvent) {
    this.searchSalesDTO.productId=event.option.value.id;
  }
  displayFn(product: ProductBean): string {
    return product && product.name ? product.name : '';
  }


  public search(){
    this.dataSource=null;
    this.resultSalesList=null;
    this.orderDetailService.getSalesByFieldsGroupByMenuProduct(this.searchSalesDTO).subscribe( data =>{
      this.resultSalesList=data.datalist;
      this.dataSource = new MatTableDataSource(data.datalist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error =>{
      this.snackBar.open(error.message,'ERROR', { duration: 5000 });
    })
  }



}
