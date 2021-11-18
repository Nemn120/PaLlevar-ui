
import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './delivery-order-detail.component.html',
  styleUrls: ['./delivery-order-detail.component.scss']
})
export class DeliveryOrderDetailComponent implements OnInit {

  @Input() data: any;
  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}

