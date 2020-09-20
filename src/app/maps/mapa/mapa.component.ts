import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_service/shared.service';
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
    private router : Router,
    private dialogMap: MatDialogRef<MapaComponent>,
  ) { }

  ngOnInit() {
    //FILTRADO DE UBICACIONES
    for (let i of this.data) {
      if (i.place!= null) {
        this.lista.push(i);
      }
    }
  }

  redirectToCompany(idCompany:number){
    this.router.navigate(['/index/shop',idCompany]);
    this.dialogMap.close();
  } 
  
  closeMap() {
    this.dialogMap.close();
  }
 

}
