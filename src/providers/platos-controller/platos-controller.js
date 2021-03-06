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
  Generated class for the PlatosControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PlatosControllerProvider = /** @class */ (function () {
    function PlatosControllerProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.platosListRef = firebase
                    .database()
                    .ref("/platos");
            }
        });
    }
    PlatosControllerProvider.prototype.getPlatosList = function () {
        return this.platosListRef;
    };
    PlatosControllerProvider.prototype.getPlatoDetail = function (eventId) {
        return this.platosListRef.child(eventId);
    };
    PlatosControllerProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], PlatosControllerProvider);
    return PlatosControllerProvider;
}());
export { PlatosControllerProvider };
//# sourceMappingURL=platos-controller.js.map