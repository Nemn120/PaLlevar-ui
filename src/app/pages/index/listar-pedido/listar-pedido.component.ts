import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ListarPedidoDataSource, ListarPedidoItem } from './listar-pedido-datasource';
import{VerMasComponent} from '../ver-mas/ver-mas.component'

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.scss']
})
export class ListarPedidoComponent implements AfterViewInit, OnInit {


  constructor(
    private dialog: MatDialog,
  ) { }

  
  public verMasPedidos(row :ListarPedidoItem){
 
    this.dialog.open(VerMasComponent, {
      width: '400px',
      data: row
    });
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListarPedidoItem>;
  dataSource: ListarPedidoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ListarPedidoDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
