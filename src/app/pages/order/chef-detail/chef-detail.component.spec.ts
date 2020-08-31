import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDetailComponent } from './chef-detail.component';

describe('ChefDetailComponent', () => {
  let component: ChefDetailComponent;
  let fixture: ComponentFixture<ChefDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
