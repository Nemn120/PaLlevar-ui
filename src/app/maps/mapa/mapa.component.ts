import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyBean } from '../../_model/CompanyBean';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  lista: CompanyBean[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompanyBean[],
  ) { }

  ngOnInit() {

    //FILTRADO DE UBICACIONES
    for (let i of this.data) {
      if (i.place.longitud != null) {
        this.lista.push(i);
      }
    }

  }


}
