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
import { NavController, NavParams, MenuController, AlertController, ModalController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { ModalContentPage } from '../modal-content/modal-content';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { TiendaPage } from '../tienda/tienda';
import { MenuDiaPage } from '../menu-dia/menu-dia';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { PerfilPage } from '../perfil/perfil';
// import { TiendaPage } from '../tienda/tienda';
// import { OrdenesPage } from '../ordenes/ordenes';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, fiadosProvider, menuCtrl, navParams, iab, profileProvider, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.fiadosProvider = fiadosProvider;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.iab = iab;
        this.profileProvider = profileProvider;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menuCtrl.enable(true);
        this.menuCtrl.toggle();
        //console.log('jedionda')
        //setTimeout(this.cargaCats(), 3000);
        //let alert = this.alertCtrl.create({
        //title: 'Vistia www.ultraki.com!',
        //subTitle: 'Visita www.fitlunch.co',
        //buttons: ['OK']
        //buttons: ['OK']
        //   {
        //     text: 'OK',
        //     icon: !this.platform.is('ios') ? 'power' : null,
        //     handler: () => {
        //       console.log('jediondisima')
        //       this.funcionjedionda();
        //     }
        //   }
        // ]
        //});
        //alert.present();
        setTimeout(function () {
            //this.imagenesProvider.getImagenesSpecificList('inicio').on('value', eventListSnapshot => {
            //this.imageListInicio = [];
            //eventListSnapshot.forEach(snap => {
            //return false;
            //})
            //})
            _this.cargaCats();
            //alert.dismiss();
        }, 1000);
        // this.fiadosProvider.getUsersList().on('value', eventListSnapshot => {
        //
        //   this.usersList = [];
        //   eventListSnapshot.forEach(snap => {
        //     this.usersList.push({
        //         key: snap.key,
        //         nombre: snap.val().firstName
        //     });
        //     return false;
        //   });
        // });
    };
    HomePage.prototype.cargaCats = function () {
        var _this = this;
        this.fiadosProvider.getCatsList().on('value', function (snap) {
            _this.catsList = [];
            snap.forEach(function (snapy) {
                //console.log( snapy.key )
                _this.catsList.push({
                    key: snapy.key,
                    nombre: snapy.val().nombre
                });
                return false;
            });
        });
    };
    HomePage.prototype.verTodos = function () {
        //console.log(item)
        var modal = this.modalCtrl.create(TiendaPage, { dataW: false });
        modal.present();
    };
    HomePage.prototype.verMenuDia = function () {
        var modal = this.modalCtrl.create(MenuDiaPage, { dataW: false });
        modal.present();
    };
    HomePage.prototype.muestraPedidos = function (dataEntrante) {
        //muestraPedidos(dataEntrante) {
        //const item = this.navParams.get('data');
        var superKey = dataEntrante;
        //let modal = this.modalCtrl.create(TiendaPage, {data: superKey});
        //modal.present();
        console.log(superKey);
        var modal = this.modalCtrl.create(ModalContentPage, { data: superKey });
        modal.present();
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            FiadosProvider,
            MenuController,
            NavParams,
            InAppBrowser,
            ProfileProvider,
            AlertController,
            ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map