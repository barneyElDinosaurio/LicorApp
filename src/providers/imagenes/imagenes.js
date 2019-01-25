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
  Generated class for the ImagenesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ImagenesProvider = /** @class */ (function () {
    function ImagenesProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.imagenesListRef = firebase
                    .database()
                    .ref("/imagenes");
            }
        });
    }
    ImagenesProvider.prototype.getImagenesList = function () {
        return this.imagenesListRef;
    };
    ImagenesProvider.prototype.getImagenesSpecificList = function (eventId) {
        return this.imagenesListRef.child(eventId);
    };
    ImagenesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ImagenesProvider);
    return ImagenesProvider;
}());
export { ImagenesProvider };
//# sourceMappingURL=imagenes.js.map