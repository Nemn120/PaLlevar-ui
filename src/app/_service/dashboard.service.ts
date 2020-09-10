import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { DashBoardDTO} from '../_model/DashboardDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = `${environment.HOST}/order`;

  constructor(  private http: HttpClient,
                private sharedService: SharedService) { }

    getDataDashboard(): any {
    const id = this.sharedService.getUserIdSession();
    return this.http.get<DashBoardDTO>(`${this.url}/gdb/${id}`);
    }
}
