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
import { PlatosControllerProvider } from '../../providers/platos-controller/platos-controller';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { CarritoPage } from '../carrito/carrito';
/**
 * Generated class for the TiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TiendaPage = /** @class */ (function () {
    function TiendaPage(
    //private socialSharing: SocialSharing,
    PlatosControllerProvider, fiadosProvider, alertCtrl, navCtrl, view, profileProvider, navParams, actionSheetCtrl, platform) {
        this.PlatosControllerProvider = PlatosControllerProvider;
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
    TiendaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var item = this.navParams.get('data');
        var itemW = this.navParams.get('dataW');
        if (itemW == false) {
            this.PlatosControllerProvider.getPlatosList().on('value', function (eventListSnapshot) {
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
        }
        else {
            this.PlatosControllerProvider.getPlatosList().orderByChild("categoria").equalTo(item).on('value', function (eventListSnapshot) {
                _this.platosList = [];
                eventListSnapshot.forEach(function (snap) {
                    _this.platosList.push({
                        id: snap.key,
                        nombre: snap.val().nombre,
                        descripcion: snap.val().descripcion,
                        precio: snap.val().precio,
                        imagen: snap.val().imagen,
                    });
                    return false;
                });
                //this.platosList = platosList;
                _this.loadedPlatosList = _this.platosList;
            });
            // this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
            //   this.userProfile = userProfileSnapshot.val();
            //   console.log(this.userProfile)
            // });
        }
    };
    // addCarrito() {
    //   const confirm = this.alertCtrl.create({
    //     title: 'Use this lightsaber?',
    //     message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?' + '<br>' +  '<ion-fab><button ion-fab>Facebook</button></ion-fab>',
    //     buttons: [
    //       {
    //         text: 'Disagree',
    //         handler: () => {
    //           console.log('Disagree clicked');
    //         }
    //       },
    //       {
    //         text: 'Agree',
    //         handler: () => {
    //           console.log('Agree clicked');
    //         }
    //       }
    //     ]
    //   });
    //   confirm.present();
    // }
    TiendaPage.prototype.addCantidad = function (cuanto) {
        if (this.cantidad == 1 && cuanto < 0) {
            this.cantidad = 1;
        }
        else {
            this.cantidad += cuanto;
        }
    };
    TiendaPage.prototype.addCarrito = function (evento) {
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
    TiendaPage.prototype.alCarrito = function () {
        this.navCtrl.push(CarritoPage);
    };
    TiendaPage.prototype.alertaAñadido = function () {
        var alert = this.alertCtrl.create({
            title: 'Listo!',
            subTitle: 'Ha sido añadido al carrito!',
            buttons: ['OK']
        });
        alert.present();
    };
    // getItems(searchbar) {
    //   // Reset items back to all of the items
    //   this.initializeItems();
    //
    //   // set q to the value of the searchbar
    //   var q = searchbar.srcElement.value;
    //
    //
    //   // if the value is an empty string don't filter the items
    //   if (!q) {
    //     return;
    //   }
    //
    //   this.platosList = this.platosList.filter((v) => {
    //     if(v.nombre && q) {
    //       if (v.nombre.toLowerCase().indexOf(q.toLowerCase()) > -1) {
    //         return true;
    //       }
    //       return false;
    //     }
    //   });
    //
    //   console.log(q, this.platosList.length);
    //
    // }
    //
    // initializeItems(): void {
    //   this.platosList = this.loadedPlatosList;
    // }
    TiendaPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    TiendaPage.prototype.crearSubCategoria = function (idProducto) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Escoge la categoria');
        this.fiadosProvider.getCatsList().on('value', function (snap) {
            snap.forEach(function (snapy) {
                alert.addInput({
                    type: 'radio',
                    label: snapy.val().nombre,
                    value: snapy.key,
                    checked: false
                });
                return false;
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                console.log('escoge:' + data);
                _this.asginarSubCat(data, idProducto);
                //this.testRadioOpen = false;
                //this.testRadioResult = data;
            }
        });
        alert.present();
        //console.log(snapy.val().nombre)
    };
    TiendaPage.prototype.asginarSubCat = function (eventCategoria, idProducto) {
        var alert = this.alertCtrl.create();
        alert.setTitle('Escoge la sub-categoria');
        this.fiadosProvider.getCatsList().child(eventCategoria).child('subcategorias').on('value', function (snap) {
            snap.forEach(function (snapy) {
                console.log(snapy.val());
                alert.addInput({
                    type: 'radio',
                    label: snapy.val().subcategoria,
                    value: snapy.key,
                    checked: false
                });
                return false;
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                console.log('escoge:' + data);
                //eventCategoria = eventCategoria +'-'+ data;
                //this.PlatosControllerProvider.updateCategoria(eventCategoria, idProducto)
                // this.upload2(eventName, eventDescripcion, eventPrecio, eventCategoria);
                //this.testRadioOpen = false;
                //this.testRadioResult = data;
            }
        });
        alert.present();
    };
    TiendaPage.prototype.presentActionSheet = function (evento) {
        var _this = this;
        console.log(evento.id);
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modifica este plato',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Cambiar de categoria',
                    icon: !this.platform.is('ios') ? 'construct' : null,
                    handler: function () {
                        _this.crearSubCategoria(evento.id);
                        // this.PlatosControllerProvider.getPlatoDetail(evento.id).on('value', eventListSnapshot => {
                        //   estadoActual = eventListSnapshot.val().estado;
                        //console.log(estadoActual)
                        //this.showConfirm(evento.id);
                        // if(estadoActual==='enLista'){
                        //   return;
                        // } else {
                        //   return;
                        // }
                        //   })
                        //})
                        // abreWasap(evento.celular)
                    }
                },
                {
                    text: 'Borrar',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        console.log('Delete clicked');
                        _this.PlatosControllerProvider.getPlatoDetail(evento.id).remove();
                    }
                },
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
    TiendaPage.prototype.showConfirm = function (evento) {
        //console.log(evento)
        var confirm = this.alertCtrl.create({
            title: '¿Poner en la tienda?',
            message: 'Lo podrán pedir los usuarios',
            inputs: [
                {
                    type: 'radio',
                    label: 'Opcion A',
                    value: 'Opcion A',
                    checked: true
                },
                {
                    type: 'radio',
                    label: 'Opcion B',
                    value: 'Opcion B',
                    checked: false
                },
                {
                    type: 'radio',
                    label: 'Premium',
                    value: 'Premium',
                    checked: false
                },
                {
                    type: 'radio',
                    label: 'Wrap',
                    value: 'Wrap',
                    checked: false
                }
            ],
            buttons: [
                {
                    text: 'Quitar',
                    handler: function () {
                        //console.log('2-> '+evento)
                        //   this.PlatosControllerProvider.getPlatoDetail(evento).once('value', snap => {
                        //   if(snap.val().opcion == 'Premium') {
                        //     this.PlatosControllerProvider.updatePrecio(-6000, evento);
                        //   }
                        // })
                        //   this.PlatosControllerProvider.updateEstado('enLista', evento)
                        //   this.PlatosControllerProvider.updateColor('danger', evento)
                    }
                },
                {
                    text: 'Poner',
                    handler: function (data) {
                        //console.log(data)
                        //if(data == 'Premium') {
                        //this.PlatosControllerProvider.updatePrecio(6000, evento);
                        //}
                        //this.PlatosControllerProvider.updateOpcion(data, evento)
                        //this.PlatosControllerProvider.updateEstado('enVenta', evento)
                        //this.PlatosControllerProvider.updateColor('secondary', evento)
                    }
                }
            ]
        });
        confirm.present();
    };
    TiendaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-tienda',
            templateUrl: 'tienda.html',
        }),
        __metadata("design:paramtypes", [PlatosControllerProvider,
            FiadosProvider,
            AlertController,
            NavController,
            ViewController,
            ProfileProvider,
            NavParams,
            ActionSheetController,
            Platform])
    ], TiendaPage);
    return TiendaPage;
}());
export { TiendaPage };
//# sourceMappingURL=tienda.js.map