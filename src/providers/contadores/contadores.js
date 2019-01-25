var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the ContadoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ContadoresProvider = /** @class */ (function () {
    function ContadoresProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.contadorPedidos = firebase
                    .database()
                    .ref("/generales");
            }
        });
    }
    ContadoresProvider.prototype.getContadoresList = function () {
        return this.contadorPedidos;
    };
    ContadoresProvider.prototype.getContadoresNodo = function (eventId) {
        return this.contadorPedidos.child(eventId);
    };
    ContadoresProvider.prototype.reiniciaContador = function (general) {
        return this.contadorPedidos.update({ general: general });
    };
    ContadoresProvider.prototype.updateHoraCierre = function (horaCierre) {
        return this.contadorPedidos.update({ horaCierre: horaCierre });
    };
    ContadoresProvider.prototype.updateValorDomi = function (precioDomi) {
        return this.contadorPedidos.update({ precioDomi: precioDomi });
    };
    ContadoresProvider.prototype.updateContador = function (cantidad) {
        return this.contadorPedidos.child('general').transaction(function (almuerzos) {
            return almuerzos + cantidad;
        });
    };
    ContadoresProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ContadoresProvider);
    return ContadoresProvider;
}());
export { ContadoresProvider };
//# sourceMappingURL=contadores.js.map