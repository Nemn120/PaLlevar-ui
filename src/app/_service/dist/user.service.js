"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var http_1 = require("@angular/common/http");
var environment_1 = require("./../../environments/environment");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var UserBean_1 = require("../_model/UserBean");
var UserService = /** @class */ (function () {
    function UserService(http, sharedService) {
        this.http = http;
        this.sharedService = sharedService;
        this.userCambio = new rxjs_1.Subject();
        this.mensajeCambio = new rxjs_1.Subject();
        this.menuCambio = new rxjs_1.Subject();
        this.url = "" + environment_1.environment.HOST;
        this.subUrl = 'user';
    }
    UserService.prototype.listar = function () {
        var access_token = sessionStorage.getItem(environment_1.environment.TOKEN_NAME);
        return this.http.get(this.url + "/" + this.subUrl + "/", {
            headers: new http_1.HttpHeaders().set('Authorization', "bearer " + access_token).set('Content-Type', 'application/json')
        });
    };
    UserService.prototype.listarPorUsuario = function (nombre) {
        var access_token = sessionStorage.getItem(environment_1.environment.TOKEN_NAME);
        return this.http.post(this.url + "/" + this.subUrl + "/gubu", nombre, {
            headers: new http_1.HttpHeaders().set('Authorization', "bearer " + access_token).set('Content-Type', 'application/json')
        });
    };
    UserService.prototype.listMenuByUser = function (userId) {
        var access_token = sessionStorage.getItem(environment_1.environment.TOKEN_NAME);
        return this.http.get(this.url + "/profile/gobp/" + userId, {
            headers: new http_1.HttpHeaders().set('Authorization', "bearer " + access_token).set('Content-Type', 'application/json')
        });
    };
    UserService.prototype.listarAll = function () {
        return this.http.get(this.url + "/" + this.subUrl + "/glur");
    };
    UserService.prototype.getListUserByOrganization = function () {
        var a = this.sharedService.getOrganizationIdByUserSession();
        return this.http.get(this.url + "/" + this.subUrl + "/gubo/" + a);
    };
    UserService.prototype.registrarTrabajador = function (user) {
        user.organizationId = this.sharedService.getOrganizationIdByUserSession();
        return this.http.post(this.url + "/" + this.subUrl + "/su", user);
    };
    UserService.prototype.getDeliveryUserList = function () {
        var user = new UserBean_1.UserBean();
        user.organizationId = this.sharedService.getOrganizationIdByUserSession();
        return this.http.post(this.url + "/" + this.subUrl + "/guldm", user);
    };
    UserService.prototype.listarPorId = function (id) {
        return this.http.get(this.url + "/" + this.subUrl + "/" + id);
    };
    UserService.prototype.registrar = function (userBean) {
        return this.http.post(this.url + "/" + this.subUrl + "/rcli", userBean);
    };
    UserService.prototype.getPhotoById = function (id) {
        return this.http.get(this.url + "/user/gp/" + id, {
            responseType: 'blob'
        });
    };
    UserService.prototype.actualizarPerfil = function (user, file) {
        user.id = this.sharedService.userSession.id;
        var formdata = new FormData();
        formdata.append('file', file);
        var productBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
        formdata.append('user', productBlob);
        return this.http.post(this.url + "/user/uu", formdata);
    };
    UserService.prototype.modificar = function (userBean) {
        return this.http.put(this.url + "/" + this.subUrl, userBean);
    };
    UserService.prototype.eliminar = function (id) {
        return this.http["delete"](this.url + "/" + this.subUrl + "/" + id);
    };
    UserService.prototype.updateStatusDelivery = function (userbean) {
        return this.http.post(this.url + "/" + this.subUrl + "/usu", userbean);
    };
    UserService.prototype.getListUserDeliveryMan = function () {
        var deliveryMan = new UserBean_1.UserBean();
        deliveryMan.organizationId = this.sharedService.getOrganizationIdByUserSession();
        deliveryMan.profile = this.sharedService.getProfileByUserSession();
        deliveryMan.profile.idProfile = 3;
        return this.http.post(this.url + "/" + this.subUrl + "/gludmos", deliveryMan);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
