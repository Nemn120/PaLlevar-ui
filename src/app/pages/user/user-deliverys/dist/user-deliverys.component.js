"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDeliverysComponent = void 0;
var core_1 = require("@angular/core");
var UserBean_1 = require("../../../_model/UserBean");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var user_delivery_form_component_1 = require("../user-delivery-form/user-delivery-form.component");
var UserDeliverysComponent = /** @class */ (function () {
    function UserDeliverysComponent(dialog, router, userService, snackBar) {
        this.dialog = dialog;
        this.router = router;
        this.userService = userService;
        this.snackBar = snackBar;
        this.displayedColumns = ['nombre', 'username', 'employeeCode', 'status', 'actions'];
        this.deliveryMan = new UserBean_1.UserBean();
    }
    UserDeliverysComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.mensajeCambio.subscribe(function (data) {
            _this.snackBar.open(data, 'INFO', {
                duration: 3500
            });
        });
        this.userService.userCambio.subscribe(function (data) {
            _this.dataSource = new table_1.MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
        this.userService.getListUserDeliveryMan().subscribe(function (data) {
            _this.dataSource = new table_1.MatTableDataSource(data.dataList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    // buscar repartidor (en proceso)
    UserDeliverysComponent.prototype.changeState = function (employee) {
        this.dialog.open(user_delivery_form_component_1.UserDeliveryFormComponent, { data: employee });
        console.log('employee: ' + employee.status);
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], UserDeliverysComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], UserDeliverysComponent.prototype, "sort");
    UserDeliverysComponent = __decorate([
        core_1.Component({
            selector: 'app-user-deliverys',
            templateUrl: './user-deliverys.component.html',
            styleUrls: ['./user-deliverys.component.scss']
        })
    ], UserDeliverysComponent);
    return UserDeliverysComponent;
}());
exports.UserDeliverysComponent = UserDeliverysComponent;
