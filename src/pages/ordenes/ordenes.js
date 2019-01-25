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
//import firebase from 'firebase';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrdenesPage = /** @class */ (function () {
    function OrdenesPage(platform, navCtrl, navParams, profileProvider, pedidosProvider, actionSheetCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileProvider = profileProvider;
        this.pedidosProvider = pedidosProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.qrData = null;
        this.createdCode = null;
    }
    OrdenesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileProvider.getUserProfile().on('value', function (userProfileSnapshot) {
            //this.userProfile = userProfileSnapshot.val();
            //console.log()
            _this.pedidosProvider.getPedidosList().orderByChild("idUser").equalTo(userProfileSnapshot.key).on('value', function (eventListSnapshot) {
                _this.pedidosList = [];
                eventListSnapshot.forEach(function (snap) {
                    _this.pedidosList.push({
                        idPedido: snap.key,
                        //domiciliario: snap.val().domiciliario,
                        idUser: snap.val().idUser,
                        nombreUser: snap.val().nombreUser,
                        nombrePlato: snap.val().nombrePlato,
                        precio: snap.val().precio,
                        cantidad: snap.val().cantidad,
                        celular: snap.val().celular,
                        direccion: snap.val().direccion,
                        imagen: snap.val().imagen,
                        nota: snap.val().nota,
                        estado: snap.val().estado
                    });
                    return false;
                });
            });
        });
    };
    OrdenesPage.prototype.presentActionSheet = function (evento) {
        var _this = this;
        //console.log(evento.idPedido)
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Tu pedido',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Confirmar entrega',
                    icon: !this.platform.is('ios') ? 'checkbox-outline' : null,
                    handler: function () {
                        _this.createdCode = evento.idPedido;
                    }
                },
                // {
                //   text: 'Borrar',
                //   role: 'destructive',
                //   icon: !this.platform.is('ios') ? 'trash' : null,
                //   handler: () => {
                //     console.log('Delete clicked');
                //     this.PlatosControllerProvider.getPlatoDetail(evento.id).remove();
                //   }
                // },
                // {
                //   text: 'Editar',
                //   icon: !this.platform.is('ios') ? 'create' : null,
                //   handler: () => {
                //     //this.navCtrl.push('EventCreatePage', { eventId : });
                //
                //       this.navCtrl.push('EventDetailPage', { eventId: evento.id });
                //
                //   }
                // },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    OrdenesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ordenes',
            templateUrl: 'ordenes.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            ProfileProvider,
            PedidosProvider,
            ActionSheetController])
    ], OrdenesPage);
    return OrdenesPage;
}());
export { OrdenesPage };
//# sourceMappingURL=ordenes.js.map