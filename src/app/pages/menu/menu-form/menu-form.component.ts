

import { Component, OnInit } from '@angular/core';

import { MenuDayBean } from '../../../_model/MenyDayBean';
import { MenuDayService } from '../../../_service/menu-day.service';

import { MenuDayProductBean } from '../../../_model/MenuDayProductBean';
import { ProductService } from '../../../_service/product.service';
import { ProductBean } from 'src/app/_model/ProductBean';

//
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuProductEditComponent } from '../menu-product-edit/menu-product-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuDayProductService } from '../../../_service/menu-day-product.service';
import { Message } from '../../../_DTO/messageDTO';
import { DialogoConfirmacionComponent } from '../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';


export interface User {
  name: string;
  apellido: string;
}
//
@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {


  menuDaySelect: MenuDayBean;


  dias: String[] = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];
  tipos: String[] = [
    'Menu',
    'Combo',
    'Promocion',

  ];


  estados: string[] = ['Activo', 'Desactivo'];


  productos: ProductBean[];
  //
  myControl = new FormControl();
  /*options: User[] = [
    {name: 'Mary',apellido:'uno'},
    {name: 'Shelley',apellido:'dos'},
    {name: 'Igor',apellido:'tres'}
  ];*/

  options: ProductBean[] = [];
  filteredOptions: Observable<ProductBean[]>;
  //

  producto: ProductBean;
  precio: number=0;
  cant: number=0;
  menuId: any;
  menuDayProductList: MenuDayProductBean[] = [];
  constructor(

    private menuDayService: MenuDayService,
    private menuDayProductService: MenuDayProductService,
    private productService: ProductService,
    public router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.listarProductos();
    this.menuId = parseInt(this.activateRoute.snapshot.paramMap.get("id"));
    if (this.menuId) {
      this.menuDayService.getMenuDayById(this.menuId).subscribe(data => {
        this.menuDaySelect = data;
        this.menuDayProductList = this.menuDaySelect.menuDayProductList;
      })
    } else {
      this.menuDaySelect = new MenuDayBean();
    }

    this.menuDayService.mensajeCambio.subscribe(data => { // cuando actualizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.menuDayService.menuDayOneCambio.subscribe(data => {
      this.menuDaySelect;
      this.menuDayProductList = data.menuDayProductList
      console.log(data);
    });

    /* if (this.menuDayService.menuDayEditar === null) {
     } else {
       this.menuDaySelect = this.menuDayService.menuDayEditar;
       this.menuDayService.menuDayEditar = null;
     }
 
     */
    //
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    //

  }


  // menuDayProduct:MenuDayProductBean[] // PRODUCTOS , PRECIO, CANTIDAD , ESTADO 
  guardar() {
    if (!this.menuDaySelect.id) {
      this.menuDaySelect.menuDayProductList = this.menuDayProductList;
      this.menuDayService.saveMenuDay(this.menuDaySelect).subscribe(data => {
        this.menuDayService.getListMenuDayByOrganization().subscribe(data2=>{
          this.menuDayService.menuDayCambio.next(data2);
        })
      }
      );
      this.router.navigate(['/menu/list']);
    } else {
      this.menuDayService.mensajeCambio.next("No se edito nada");
    }
  }


  listarProductos() {
    this.productService.getListProductByOrganization().subscribe(data => {
      this.options = data;
    });
  }

  itemSelected(event: MatAutocompleteSelectedEvent,) {
    this.producto = event.option.value;
  }
  agregarProduct() {
    let nuevoMenuDayProduct: MenuDayProductBean = new MenuDayProductBean();
    if (!this.menuId) {
      nuevoMenuDayProduct.product = this.producto;
      nuevoMenuDayProduct.price = this.precio;
      nuevoMenuDayProduct.quantity = this.cant;
      this.menuDayProductList.push(nuevoMenuDayProduct);
      this.menuDayService.mensajeCambio.next("Se agrego el producto");
    } else {
      let ms = new Message();
      ms.title = 'Guardar cambios';
      ms.description = '¿Desea agregar un platillo al menu?';
      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: ms
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            nuevoMenuDayProduct.product = this.producto;
            nuevoMenuDayProduct.price = this.precio;
            nuevoMenuDayProduct.quantity = this.cant;
            nuevoMenuDayProduct.menuDayId = this.menuId;
            this.menuDayProductService.saveMenuDayProduct(nuevoMenuDayProduct).subscribe(data => {
              this.menuDayService.getMenuDayById(this.menuId).subscribe(data2=>{
                this.menuDayService.menuDayOneCambio.next(data2);
                this.menuDayService.mensajeCambio.next(data.message);
              })
              
            })
          }
          this.dialog.closeAll();
        });

    }


  }

  remove(menuProduct: MenuDayProductBean) {
    //debugger
    if (!this.menuId) {
      const itemIndex = this.menuDayProductList.findIndex(temp => temp.id === menuProduct.id);
      if (itemIndex > -1) {
        this.menuDayProductList.splice(itemIndex, 1);
      }
    } else {
      let ms = new Message();
      ms.title = 'Eliminar platillo';
      ms.description = '¿Desea eliminar el platillo seleccionado?';
      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: ms
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            menuProduct.menuDayId = this.menuId;
            this.menuDayProductService.deleteMenuProduct(menuProduct).subscribe(data => {
              this.menuDayService.getMenuDayById(this.menuId).subscribe(data2 => {
                this.menuDayProductList = data2.menuDayProductList;
                this.menuDayService.mensajeCambio.next(data.message);
              })
            }, error => {
              this.menuDayService.mensajeCambio.next(error.message);
            })
          }
          this.dialog.closeAll();
        });
    }
  }
  editMenuProduct(menuProductBean: MenuDayProductBean) {
    let menuProductSelect = menuProductBean != null ? menuProductBean : new MenuDayProductBean();
    menuProductSelect.menuDayId = this.menuId;
    this.dialog.open(MenuProductEditComponent, {
      data: menuProductSelect
    });
  }

  displayFn(user: ProductBean): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): ProductBean[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  //

}
