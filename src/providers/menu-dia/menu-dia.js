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
  Generated class for the MenuDiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MenuDiaProvider = /** @class */ (function () {
    function MenuDiaProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.platosListRef = firebase
                    .database()
                    .ref("/platosDelDia");
            }
        });
    }
    MenuDiaProvider.prototype.getPlatosList = function () {
        return this.platosListRef;
    };
    MenuDiaProvider.prototype.getPlatoDetail = function (eventId) {
        return this.platosListRef.child(eventId);
    };
    MenuDiaProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], MenuDiaProvider);
    return MenuDiaProvider;
}());
export { MenuDiaProvider };
//# sourceMappingURL=menu-dia.js.map