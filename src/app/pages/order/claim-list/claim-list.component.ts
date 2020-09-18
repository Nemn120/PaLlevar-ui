import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintService } from '../../../_service/complaint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ComplaintBean } from '../../../_model/ComplaintBean';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {ClaimDetailComponent} from '../../../_shared/claim-detail/claim-detail.component'

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'titulo', 'description','orderId','createDate'];
  dataSource: MatTableDataSource<ComplaintBean>;// tabla 
  titleclaimList: string;
  constructor(
    private complaintService:ComplaintService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleclaimList="Listado de reclamos";
    this.complaintService.mensajeCambio.subscribe(data => { 
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.complaintService.complaintCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.complaintService.getListComplaintByOrg().subscribe(data => {  
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error =>{
      console.error(error);
      this.complaintService.mensajeCambio.next("Error al mostrar la lista de reclamos");
    });

  }
  public openDialog(complaint?: ComplaintBean) {
    let complaintSelect = complaint != null ? complaint : new ComplaintBean();
    this.dialog.open(ClaimDetailComponent, {
      
      data: complaintSelect
    }); 
  }
}
