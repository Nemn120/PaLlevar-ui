import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuOptionService } from '../../../_service/menu-option.service';
import { OrganizationService } from '../../../_service/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyBean } from '../../../_model/CompanyBean';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'nombre', 'ruc','createDater','user','actions'];
  dataSource: MatTableDataSource<CompanyBean>;/// tabla 
  titleCompanyList: string;
  constructor(
    private organizationService:OrganizationService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleCompanyList="Listar Productos";
    this.organizationService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.organizationService.companyCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    //this.productService.getListProduct().subscribe(data => {
    this.organizationService.getListCompany().subscribe(data => {  
    //this.productService.getListProductByOrganizationAndSucursal().subscribe(data => {  
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },error =>{
      this.organizationService.mensajeCambio.next("Error al mostrar organizaciones");
    });

  }

  public openDialog(company: CompanyBean) {
    let companySelect = company != null ? company : new CompanyBean();
    this.dialog.open(OrganizationFormComponent, {
      width: '600',
      height: '600',
      data: companySelect
    });
  }
  public delete(product:CompanyBean){
      this.organizationService.deleteCompany(product.id).subscribe(data => {
        this.organizationService.getListCompany().subscribe(data => {
          this.organizationService.companyCambio.next(data);
          this.organizationService.mensajeCambio.next("Se elimino con éxito");
        }, error =>{
          console.error(error);
          this.organizationService.mensajeCambio.next("Error al mostrar listado de organizaciones");
        });
      },error =>{
        console.error(error);
        this.organizationService.mensajeCambio.next("La organizacion que desea eliminar esta siendo usada");
      });
    }

}
