
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuDayBean } from '../../../_model/MenyDayBean';
import { MenuDayService } from '../../../_service/menu-day.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { VerProductosMenuComponent } from '../ver-productos-menu/ver-productos-menu.component';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'description','day','status','actions'];
  dataSource: MatTableDataSource<MenuDayBean>;/// tabla 
  titleProductList: string;

  constructor(
    private menuDayService:MenuDayService, private dialog:MatDialog, private snackBar: MatSnackBar
  ,private router:Router
  
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
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error =>{
        this.menuDayService.mensajeCambio.next("Error al mostrar productos");
      });
  }

  editar(menuDay: MenuDayBean){
    this.menuDayService.menuDayEditar=menuDay;
    this.router.navigate(['menu/edit',menuDay.id]);
      
  }
  
  delete(menuDay:MenuDayBean){
    this.menuDayService.deleteMenuDay(menuDay.id).subscribe(data => {
      this.menuDayService.getListMenuDayByOrganization().subscribe(data => {
        this.menuDayService.menuDayCambio.next(data);
        this.menuDayService.mensajeCambio.next("Se elimino con éxito");
      }, error =>{
        console.error(error);
        this.menuDayService.mensajeCambio.next("Error al mostrar listado de menus");
      });
    },error =>{
      console.error(error);
      this.menuDayService.mensajeCambio.next("El menu que desea eliminar esta siendo usado");
    });
  }


  ver(menuDay:MenuDayBean){
   
    this.dialog.open(VerProductosMenuComponent, {
      width: '1000',
      //height: '600',
      data: menuDay
    });

  }

}
