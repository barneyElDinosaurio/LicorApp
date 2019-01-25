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
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { ContadoresProvider } from '../../providers/contadores/contadores';
/**
 * Generated class for the UbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UbicacionPage = /** @class */ (function () {
    function UbicacionPage(navCtrl, navParams, alertCtrl, 
    //public authProvider: AuthProvider,
    //public profileProvider: ProfileProvider,
    contadoresProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.contadoresProvider = contadoresProvider;
    }
    UbicacionPage.prototype.dd = function () {
        this.contadoresProvider.getContadoresNodo('mapa').on('value', function (snape) {
            //this.mapa = snape.val().title;
            ///console.log(this.mapa)
            //var div = document.getElementById( 'ixi' );
            //div.insertAdjacentHTML( 'beforeend', this.mapa );
        });
    };
    UbicacionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.contadoresProvider.getContadoresNodo('mapa').once('value', function (snape) {
            _this.mapa = snape.val().title;
            console.log(_this.mapa);
            var div = document.getElementById('ixi');
            div.insertAdjacentHTML('beforeend', _this.mapa);
        });
    };
    UbicacionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ubicacion',
            templateUrl: 'ubicacion.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            ContadoresProvider])
    ], UbicacionPage);
    return UbicacionPage;
}());
export { UbicacionPage };
//# sourceMappingURL=ubicacion.js.map