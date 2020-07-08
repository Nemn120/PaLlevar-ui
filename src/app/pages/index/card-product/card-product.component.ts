import { Component, OnInit } from '@angular/core';
import { CompanyBean } from '../../../_model/CompanyBean';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  imagen = "../../../../assets/images/plato1.png";

  platillos: CompanyBean[] = [
    {id: 1, nombre: 'Producto 1', ruc: 'ruc1', createDate: null, userAdmin: null},
    {id: 2, nombre: 'Producto 2', ruc: 'ruc2', createDate: null, userAdmin: null},
    {id: 3, nombre: 'Producto 3', ruc: 'ruc3', createDate: null, userAdmin: null},
    {id: 4, nombre: 'Producto 4', ruc: 'ruc4', createDate: null, userAdmin: null},
    {id: 5, nombre: 'Producto 5', ruc: 'ruc5', createDate: null, userAdmin: null},
    {id: 6, nombre: 'Producto 6', ruc: 'ruc6', createDate: null, userAdmin: null},
    {id: 7, nombre: 'Producto 7', ruc: 'ruc7', createDate: null, userAdmin: null},
    {id: 8, nombre: 'Producto 8', ruc: 'ruc8', createDate: null, userAdmin: null}
  ];

  platillos2: CompanyBean[] = null;


  constructor() { }

  ngOnInit(): void {
  }

}
