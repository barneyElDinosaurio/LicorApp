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
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PedidosProvider = /** @class */ (function () {
    function PedidosProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.pedidosListRef = firebase
                    .database()
                    .ref("/pedidos");
            }
        });
    }
    PedidosProvider.prototype.getPedidosList = function () {
        return this.pedidosListRef;
    };
    PedidosProvider.prototype.getPedidosDetail = function (eventId) {
        return this.pedidosListRef.child(eventId);
    };
    PedidosProvider.prototype.createPedido = function (idUser, nombreUser, nombrePlato, celular, imagen, 
    //nota: string,
    //estado: string,
    //opcion: string,
    pago, precio, 
    //zona: string,
    direccion, cantidad) {
        return this.pedidosListRef.push({
            idUser: idUser,
            nombreUser: nombreUser,
            nombrePlato: nombrePlato,
            celular: celular,
            imagen: imagen,
            //nota:        nota,
            //estado:      estado,
            //opcion:      opcion,
            pago: pago,
            precio: precio,
            //zona:        zona,
            direccion: direccion,
            cantidad: cantidad,
        });
    };
    PedidosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], PedidosProvider);
    return PedidosProvider;
}());
export { PedidosProvider };
//# sourceMappingURL=pedidos.js.map