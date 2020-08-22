"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarDialogComponent = void 0;
var core_1 = require("@angular/core");
var collections_1 = require("@angular/cdk/collections");
var table_1 = require("@angular/material/table");
var OrderBean_1 = require("../../../_model/OrderBean");
var dialogo_confirmacion_component_1 = require("../../../_shared/dialogo-confirmacion/dialogo-confirmacion.component");
var order_confirm_component_1 = require("../order-confirm/order-confirm.component");
var CarDialogComponent = /** @class */ (function () {
    function CarDialogComponent(carService, sharedService, orderService, loginService, router, dialogo, snackBar) {
        this.carService = carService;
        this.sharedService = sharedService;
        this.orderService = orderService;
        this.loginService = loginService;
        this.router = router;
        this.dialogo = dialogo;
        this.snackBar = snackBar;
        this.odList = new Array();
        this.displayedColumns = ['select', 'name', 'price'];
    }
    CarDialogComponent.prototype.ngOnInit = function () {
        this.odList = this.carService.getItems();
        this.dataSource = new table_1.MatTableDataSource(this.odList);
        this.selection = new collections_1.SelectionModel(true, []);
    };
    CarDialogComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = !!this.dataSource && this.dataSource.data.length;
        return numSelected === numRows;
    };
    CarDialogComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(function (r) { return _this.selection.select(r); });
    };
    CarDialogComponent.prototype.closeDialog = function () {
        this.dialogo.closeAll();
    };
    CarDialogComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.id + 1);
    };
    CarDialogComponent.prototype.sendOrder = function () {
        var _this = this;
        // debugger;
        var params = {
            title: 'Generar pedido',
            description: '¿Desea realizar el pedido?',
            inputData: true
        };
        var numSelected = this.selection.selected;
        if (numSelected.length > 0) {
            // debugger
            this.dialogo
                .open(dialogo_confirmacion_component_1.DialogoConfirmacionComponent, {
                data: params
            })
                .afterClosed()
                .subscribe(function (confirmado) {
                // if (confirm("¿Desea realizar el pedido? ")) {
                if (confirmado) {
                    if (_this.sharedService.userSession) {
                        _this.sendOrderCar = new OrderBean_1.OrderBean();
                        _this.sendOrderCar = _this.carService.orderHeader;
                        /*this.carService.newOrder.subscribe(x =>{
                          this.sendOrderCar=x;
                        })
                        */
                        // this.sendOrderCar=this.carService.getOrder();
                        _this.sendOrderCar.orderDetail = [];
                        numSelected.forEach(function (x) {
                            _this.sendOrderCar.orderDetail.push(x);
                            _this.carService.numberProductSelected--;
                        });
                        _this.sendOrderCar.userOrder = _this.sharedService.userSession;
                        _this.orderService.saveNewOrder(_this.sendOrderCar).subscribe(function (data) {
                            _this.carService.deleteProductList(numSelected);
                            _this.odList = _this.carService.getItems();
                            _this.dataSource.data = _this.odList;
                            _this.closeDialog();
                            // LLAMAS AL DIALOGO QUE TIENE EL RESUMEN DEL PEDIDO
                            _this.dialogo.open(order_confirm_component_1.OrderConfirmComponent, {
                                width: '600px',
                                data: data.data
                            });
                            _this.snackBar.open(data.message, 'SUCESS', { duration: 5000 });
                        }, function (error) {
                            _this.snackBar.open(error.error, 'ERROR', { duration: 5000 });
                        });
                    }
                    else {
                        _this.router.navigate(['auth/login']);
                    }
                }
            });
        }
        else {
            alert('Seleccione algun producto');
        }
    };
    CarDialogComponent.prototype.deleteProductsSelect = function () {
        var _this = this;
        var numSelected = this.selection.selected;
        if (numSelected.length > 0) {
            if (confirm('¿Desea borrar los productos seleccionados del carrito? ')) {
                this.carService.deleteProductList(numSelected);
                this.odList = this.carService.getItems();
                this.dataSource.data = this.odList;
                numSelected.forEach(function (x) { _this.carService.numberProductSelected--; });
            }
        }
        else {
            alert('Seleccione el producto a eliminar');
        }
    };
    CarDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-car-dialog',
            templateUrl: './car-dialog.component.html',
            styleUrls: ['./car-dialog.component.scss']
        })
    ], CarDialogComponent);
    return CarDialogComponent;
}());
exports.CarDialogComponent = CarDialogComponent;
