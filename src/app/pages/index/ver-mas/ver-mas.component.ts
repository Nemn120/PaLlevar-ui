import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.scss']
})
export class VerMasComponent {

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(DetallesComponent);
    
  }

}

