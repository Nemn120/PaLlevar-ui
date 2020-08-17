import { Injectable } from '@angular/core';
import { PlaceBean } from '../_model/PlaceBean';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  newPlace:PlaceBean=new PlaceBean();

  constructor() { }
}
