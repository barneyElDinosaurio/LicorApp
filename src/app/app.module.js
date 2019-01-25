var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Firebase } from '@ionic-native/firebase';
// import { AngularFireModule } from 'angularfire2';
// import { FCM } from '@ionic-native/fcm';
//import firebase from 'firebase';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { Http } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { MenuDiaPage } from '../pages/menu-dia/menu-dia';
import { TiendaPage } from '../pages/tienda/tienda';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { NosotrosPage } from '../pages/nosotros/nosotros';
import { CarritoPage } from '../pages/carrito/carrito';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { PlatosControllerProvider } from '../providers/platos-controller/platos-controller';
import { MembresiaProvider } from '../providers/membresia/membresia';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { ImagenesProvider } from '../providers/imagenes/imagenes';
import { FiadosProvider } from '../providers/fiados/fiados';
import { ContadoresProvider } from '../providers/contadores/contadores';
import { ModalContentPage } from '../pages/modal-content/modal-content';
import { MenuDiaProvider } from '../providers/menu-dia/menu-dia';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                PerfilPage,
                TiendaPage,
                OrdenesPage,
                NosotrosPage,
                ModalContentPage,
                CarritoPage,
                MenuDiaPage,
                UbicacionPage,
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                NgxQRCodeModule,
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                PerfilPage,
                TiendaPage,
                OrdenesPage,
                ModalContentPage,
                NosotrosPage,
                CarritoPage,
                MenuDiaPage,
                UbicacionPage,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                NgxQRCodeModule,
                AuthProvider,
                EventProvider,
                ProfileProvider,
                SocialSharing,
                PlatosControllerProvider,
                MembresiaProvider,
                PedidosProvider,
                // FCM,
                Firebase,
                GooglePlus,
                ImagenesProvider,
                FiadosProvider,
                ContadoresProvider,
                MenuDiaProvider,
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map