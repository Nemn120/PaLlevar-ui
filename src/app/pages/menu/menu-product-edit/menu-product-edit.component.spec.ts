import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProductEditComponent } from './menu-product-edit.component';

describe('MenuProductEditComponent', () => {
  let component: MenuProductEditComponent;
  let fixture: ComponentFixture<MenuProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
