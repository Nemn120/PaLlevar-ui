import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = `${environment.HOST}/order`;

  constructor(  private http: HttpClient,
                private sharedService: SharedService) { }

    getDataDashboard(): any {
    const id = this.sharedService.userSession.organizationId;
    return this.http.get<any>(`${this.url}/gdb/${id}`);
    }
}
