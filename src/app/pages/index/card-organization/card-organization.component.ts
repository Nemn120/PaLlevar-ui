import { Component, OnInit } from '@angular/core';
import { CompanyBean } from 'src/app/_model/CompanyBean';
import { OrganizationService } from '../../../_service/organization.service';

@Component({
  selector: 'app-card-organization',
  templateUrl: './card-organization.component.html',
  styleUrls: ['./card-organization.component.scss']
})
export class CardOrganizationComponent implements OnInit {

  imagen = "https://www.pngitem.com/pimgs/m/208-2089100_logos-de-comida-para-llevar-hd-png-download.png";


  organizaciones: CompanyBean[] = [
    {id: 1, nombre: 'Organizacion 1', ruc: 'ruc1', createDate: null, userAdmin: null},
    {id: 2, nombre: 'Organizacion 2', ruc: 'ruc2', createDate: null, userAdmin: null},
    {id: 3, nombre: 'Organizacion 3', ruc: 'ruc3', createDate: null, userAdmin: null},
    {id: 4, nombre: 'Organizacion 4', ruc: 'ruc4', createDate: null, userAdmin: null},
    {id: 5, nombre: 'Organizacion 5', ruc: 'ruc5', createDate: null, userAdmin: null},
    {id: 6, nombre: 'Organizacion 6', ruc: 'ruc6', createDate: null, userAdmin: null},
    {id: 7, nombre: 'Organizacion 7', ruc: 'ruc7', createDate: null, userAdmin: null},
    {id: 8, nombre: 'Organizacion 8', ruc: 'ruc8', createDate: null, userAdmin: null}
  ];

  organizaciones2 = null;
  
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.listarOrganizaciones();
  }

  listarOrganizaciones(): void {
    /*this.organizationService.getListCompany().subscribe(
      data => this.organizaciones2 = data
    );*/
  }

}
