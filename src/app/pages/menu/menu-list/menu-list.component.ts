import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuDayBean } from '../../../_model/MenyDayBean';
import { MenuDayService } from '../../../_service/menu-day.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'description','day','type','status','actions'];
  dataSource: MatTableDataSource<MenuDayBean>;/// tabla 
  titleProductList: string;

  constructor(
    private menuDayService:MenuDayService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) {

   }

  ngOnInit(): void {
    this.titleProductList="Listar Productos";
    this.menuDayService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
    
    this.menuDayService.menuDayCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.menuDayService.getListMenuDayByOrganization().subscribe(data => {  
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },error =>{
        this.menuDayService.mensajeCambio.next("Error al mostrar productos");
      });
  
  }

  openDialog(){

  }
  delete(){

  }

}
