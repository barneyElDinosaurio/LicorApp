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
  Generated class for the FiadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FiadosProvider = /** @class */ (function () {
    function FiadosProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.catsListRef = firebase
                    .database()
                    .ref("/categorias");
            }
        });
    }
    FiadosProvider.prototype.getFiadosList = function () {
        return this.fiadosListRef;
    };
    FiadosProvider.prototype.getFiadosDetail = function (eventId) {
        return this.fiadosListRef.child(eventId);
    };
    FiadosProvider.prototype.createFiado = function (idUser, nombreUser, nombrePlato, celular, direccion, imagen, nota, estado, zona, opcion, pago) {
        return this.fiadosListRef.push({
            idUser: idUser,
            nombreUser: nombreUser,
            nombrePlato: nombrePlato,
            celular: celular,
            direccion: direccion,
            imagen: imagen,
            nota: nota,
            estado: estado,
            zona: zona,
            opcion: opcion,
            pago: pago,
        });
    };
    FiadosProvider.prototype.getCatsList = function () {
        return this.catsListRef;
    };
    FiadosProvider.prototype.getCatsDetail = function (eventId) {
        return this.catsListRef.child(eventId);
    };
    FiadosProvider.prototype.crearCategoria = function (input) {
        return this.catsListRef.push({ nombre: input });
    };
    FiadosProvider.prototype.crearSubCategoria = function (key, subcategorias) {
        return this.catsListRef.child(key).child('subcategorias').push(subcategorias);
    };
    FiadosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FiadosProvider);
    return FiadosProvider;
}());
export { FiadosProvider };
//# sourceMappingURL=fiados.js.map