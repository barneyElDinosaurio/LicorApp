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
import { IonicPage, NavController, NavParams, ViewController, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { MenuDiaProvider } from '../../providers/menu-dia/menu-dia';
/**
 * Generated class for the MenuDiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuDiaPage = /** @class */ (function () {
    function MenuDiaPage(menuDiaProvider, fiadosProvider, alertCtrl, navCtrl, view, profileProvider, navParams, actionSheetCtrl, platform) {
        this.menuDiaProvider = menuDiaProvider;
        this.fiadosProvider = fiadosProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.view = view;
        this.profileProvider = profileProvider;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.cantidad = 1;
    }
    MenuDiaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menuDiaProvider.getPlatosList().on('value', function (eventListSnapshot) {
            _this.platosList = [];
            eventListSnapshot.forEach(function (snap) {
                _this.platosList.push({
                    id: snap.key,
                    nombre: snap.val().nombre,
                    descripcion: snap.val().descripcion,
                    precio: snap.val().precio,
                    imagen: snap.val().imagen,
                    color: snap.val().color
                });
                return false;
            });
            //this.platosList = platosList;
            _this.loadedPlatosList = _this.platosList;
        });
    };
    MenuDiaPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    MenuDiaPage.prototype.addCantidad = function (cuanto) {
        if (this.cantidad == 1 && cuanto < 0) {
            this.cantidad = 1;
        }
        else {
            this.cantidad += cuanto;
        }
    };
    MenuDiaPage.prototype.addCarrito = function (evento) {
        var _this = this;
        //console.log(evento);
        // if(evento.opcion == 'Premium') {
        //   setTimeout(()=>this.esPremium(), 1000);
        // }
        // this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
        //   console.log('jedionda')
        //
        //   });
        this.profileProvider.getUserProfile().once('value', function (userProfileSnapshot) {
            if (userProfileSnapshot.val().firstName == undefined ||
                userProfileSnapshot.val().lastName == undefined ||
                userProfileSnapshot.val().celular == undefined) {
                //userProfileSnapshot.val().zona ==undefined ||
                //userProfileSnapshot.val().direccion ==undefined) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Oops...!',
                    subTitle: 'Nos faltan algunos datos, por favor llena tu perfil con nombre completo, celular y dirección.',
                    buttons: ['OK']
                });
                alert_1.present();
                return false;
            }
            var dir = userProfileSnapshot.val().direccion + ' ' + userProfileSnapshot.val().detalleDireccion;
            //var nota = userProfileSnapshot.val().nota;
            var wasap = userProfileSnapshot.val().celular;
            var nombreUser = userProfileSnapshot.val().firstName + ' ' + userProfileSnapshot.val().lastName;
            var idUser = userProfileSnapshot.key;
            //var zona = userProfileSnapshot.val().zona;
            console.log(evento);
            _this.profileProvider.addCarrito(evento, dir, wasap, idUser, nombreUser, _this.cantidad);
            //this.profileProvider.addCarrito(evento);
            _this.alertaAñadido();
        });
    };
    MenuDiaPage.prototype.alertaAñadido = function () {
        var alert = this.alertCtrl.create({
            title: 'Listo!',
            subTitle: 'Ha sido añadido al carrito!',
            buttons: ['OK']
        });
        alert.present();
    };
    MenuDiaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu-dia',
            templateUrl: 'menu-dia.html',
        }),
        __metadata("design:paramtypes", [MenuDiaProvider,
            FiadosProvider,
            AlertController,
            NavController,
            ViewController,
            ProfileProvider,
            NavParams,
            ActionSheetController,
            Platform])
    ], MenuDiaPage);
    return MenuDiaPage;
}());
export { MenuDiaPage };
//# sourceMappingURL=menu-dia.js.map