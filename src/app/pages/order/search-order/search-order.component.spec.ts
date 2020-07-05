import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrderComponent } from './search-order.component';

describe('SearchOrderComponent', () => {
  let component: SearchOrderComponent;
  let fixture: ComponentFixture<SearchOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
