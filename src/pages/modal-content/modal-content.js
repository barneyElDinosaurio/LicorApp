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
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { TiendaPage } from '../tienda/tienda';
/**
 * Generated class for the ModalContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalContentPage = /** @class */ (function () {
    function ModalContentPage(navCtrl, fiadosProvider, modalCtrl, navParams, pedidosProvider, view) {
        this.navCtrl = navCtrl;
        this.fiadosProvider = fiadosProvider;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.pedidosProvider = pedidosProvider;
        this.view = view;
    }
    ModalContentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.item = this.navParams.get('data');
        console.log(this.item);
        console.log(this.item.nombre);
        console.log('la rejedionda');
        //console.log(item);
        // let alert = this.alertCtrl.create();
        this.fiadosProvider.getCatsList().child(this.item.key).child('subcategorias').on('value', function (eventListSnapshot) {
            //console.log( eventListSnapshot.val() )
            _this.pedidosList = [];
            eventListSnapshot.forEach(function (snap) {
                //console.log( snap.val().subcategoria )
                _this.pedidosList.push({
                    subcat: snap.val().subcategoria,
                    key: snap.key
                });
                // this.celularUser = 'whatsapp://send?phone=57'+snap.val().celular;
                // this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.celularUser);
                return false;
            });
        });
        // console.log('ionViewDidLoad ModalContentPage');
    };
    ModalContentPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    ModalContentPage.prototype.muestraPedidos = function (dataEntrante) {
        var item = this.navParams.get('data');
        var superKey = (item.key + '-' + dataEntrante.key);
        var modal = this.modalCtrl.create(TiendaPage, { data: superKey });
        modal.present();
        //console.log(item.key);
        //console.log(dataEntrante.key);
    };
    ModalContentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modal-content',
            templateUrl: 'modal-content.html',
        }),
        __metadata("design:paramtypes", [NavController,
            FiadosProvider,
            ModalController,
            NavParams,
            PedidosProvider,
            ViewController])
    ], ModalContentPage);
    return ModalContentPage;
}());
export { ModalContentPage };
//# sourceMappingURL=modal-content.js.map