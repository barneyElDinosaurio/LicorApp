var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, Platform, IonicPage, NavParams } from 'ionic-angular';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
/**
 * Generated class for the NosotrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NosotrosPage = /** @class */ (function () {
    function NosotrosPage(navCtrl, imagenesProvider, alertCtrl, platform, navParams) {
        this.navCtrl = navCtrl;
        this.imagenesProvider = imagenesProvider;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.navParams = navParams;
    }
    NosotrosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.imagenesProvider.getImagenesSpecificList('nosotros').on('value', function (eventListSnapshot) {
            _this.imageListNosotros = [];
            eventListSnapshot.forEach(function (snap) {
                _this.imageListNosotros.push({
                    id: snap.key,
                    nombre: snap.val().nombre,
                    imagen: snap.val().imagen,
                    tipo: 'nosotros'
                });
                return false;
            });
            //this.platosList = platosList;
            //this.loadedPlatosList = this.platosList;
        });
    };
    NosotrosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-nosotros',
            templateUrl: 'nosotros.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ImagenesProvider,
            AlertController,
            Platform,
            NavParams])
    ], NosotrosPage);
    return NosotrosPage;
}());
export { NosotrosPage };
//# sourceMappingURL=nosotros.js.map