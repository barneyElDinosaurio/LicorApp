var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { FCM } from '@ionic-native/fcm';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { NosotrosPage } from '../pages/nosotros/nosotros';
import { CarritoPage } from '../pages/carrito/carrito';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { firebaseConfig } from './credentials';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        firebase.initializeApp(firebaseConfig);
        this.rootPage = HomePage;
        this.pages = [
            { titulo: 'Conocenos', component: NosotrosPage, icon: 'home' },
            { titulo: 'Mi perfil', component: PerfilPage, icon: 'person' },
            { titulo: 'Menú', component: HomePage, icon: 'star' },
            // { titulo: 'Tienda',    component:TiendaPage,   icon: 'basket' },
            { titulo: 'Carrito', component: CarritoPage, icon: 'cart' },
            { titulo: 'Ordenes', component: OrdenesPage, icon: 'flame' },
            { titulo: 'Ubicación', component: UbicacionPage, icon: 'locate' }
        ];
        var unsuscribe = firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                _this.rootPage = 'LoginPage';
            }
            else {
                _this.rootPage = HomePage;
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            //splashScreen.hide();
        });
    }
    MyApp.prototype.goToPage = function (page) {
        this.content.setRoot(page);
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "content", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map