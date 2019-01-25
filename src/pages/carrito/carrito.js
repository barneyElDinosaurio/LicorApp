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
import { IonicPage, NavController, NavParams, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { HomePage } from '../home/home';
import { ContadoresProvider } from '../../providers/contadores/contadores';
/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CarritoPage = /** @class */ (function () {
    function CarritoPage(navCtrl, navParams, profileProvider, pedidosProvider, alertCtrl, actionSheetCtrl, platform, fiadosProvider, contadoresProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileProvider = profileProvider;
        this.pedidosProvider = pedidosProvider;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.fiadosProvider = fiadosProvider;
        this.contadoresProvider = contadoresProvider;
    }
    CarritoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileProvider.getUserProfile().child('direcciones').on('value', function (eventListSnapshot) {
            eventListSnapshot.forEach(function (snap) {
                //console.log(snap.val().direccion)
                return false;
            });
            //this.listoCompra();
        });
        var precio;
        this.profileProvider.getUserProfile().child('carrito').on('value', function (userProfileSnapshot) {
            _this.cuantosPide = 0;
            _this.precioTotal = 0;
            //this.userProfile = userProfileSnapshot.val();
            //console.log()
            //this.pedidosProvider.getPedidosList().orderByChild("idUser").equalTo(userProfileSnapshot.key).on('value', eventListSnapshot => {
            _this.carritoList = [];
            userProfileSnapshot.forEach(function (snap) {
                _this.carritoList.push({
                    idPedido: snap.key,
                    //domiciliario: snap.val().domiciliario,
                    idUser: snap.val().idUser,
                    nombreUser: snap.val().nombreUser,
                    nombrePlato: snap.val().nombrePlato,
                    celular: snap.val().celular,
                    direccion: snap.val().direccion,
                    imagen: snap.val().imagen,
                    nota: snap.val().nota,
                    estado: snap.val().estado,
                    zona: snap.val().zona,
                    opcion: snap.val().opcion,
                    precio: snap.val().precio,
                    cantidad: snap.val().cantidad,
                });
                precio = snap.val().precio;
                if (snap.val().nota == 'Jugo') {
                    precio = parseInt(snap.val().precio) + 1000;
                }
                _this.precioTotal += parseInt(precio);
                _this.cuantosPide += 1;
                return false;
            });
            //
            _this.contadoresProvider.getContadoresNodo('precioDomi').once('value', function (domiSnap) {
                _this.domicilio = domiSnap.val();
                _this.totalFinal = _this.precioTotal + parseInt(domiSnap.val());
            });
            //});
        });
    };
    CarritoPage.prototype.comoPagar = function (zona, direccion) {
        var _this = this;
        if (this.cuantosPide == 0) {
            this.carritoVacio();
            return false;
        }
        //console.log(evento)
        var confirm = this.alertCtrl.create({
            title: '¿Cómo deseas pagar?',
            subTitle: 'Pagas ' + this.cuantosPide + ' almuerzo(s) por $' + this.precioTotal.toLocaleString(),
            message: 'Puedes usar almuerzos de tu plan o pagar el precio al repartidor',
            inputs: [
                {
                    type: 'radio',
                    label: 'Plan',
                    value: 'membresia',
                    checked: true
                },
                {
                    type: 'radio',
                    label: 'En efectivo',
                    value: 'efectivo',
                    checked: false
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        //console.log('2-> '+evento)
                        //this.PlatosControllerProvider.updateEstado('enLista', evento)
                        //this.PlatosControllerProvider.updateColor('danger', evento)
                    }
                },
                {
                    text: 'Pedir',
                    handler: function (data) {
                        //console.log(data)
                        var d = new Date();
                        var hora = d.getHours();
                        var idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio, cantidad;
                        _this.profileProvider.getUserProfile().once('value', function (userProfileSnapshot) {
                            //var dir = userProfileSnapshot.val().direccion;
                            //var nota = userProfileSnapshot.val().nota;
                            var wasap = userProfileSnapshot.val().celular;
                            var nombreUser = userProfileSnapshot.val().firstName + ' ' + userProfileSnapshot.val().lastName;
                            var idUser = userProfileSnapshot.key;
                            //var zona = userProfileSnapshot.val().zona;
                            var horaCierre;
                            var permiso = false;
                            _this.contadoresProvider.getContadoresNodo('horaCierre').once('value', function (horaSnap) {
                                _this.horaCierre = horaSnap.val();
                                console.log(_this.horaCierre);
                                if (hora >= _this.horaCierre) {
                                    var alert_1 = _this.alertCtrl.create({
                                        title: 'Muy tarde!',
                                        subTitle: 'Debes hacer tu pedido antes de las ' + _this.horaCierre,
                                        buttons: ['OK']
                                    });
                                    alert_1.present();
                                    return false;
                                }
                                else if (data == 'membresia') {
                                    if (userProfileSnapshot.val().almuerzos < _this.cuantosPide) {
                                        _this.membresiaInsuficiente();
                                    }
                                    else if (userProfileSnapshot.val().almuerzos >= _this.cuantosPide) {
                                        _this.profileProvider.updateCantidad(-_this.cuantosPide);
                                        _this.profileProvider.getUserProfile().child('carrito').once('value', function (userProfileSnapshot2) {
                                            userProfileSnapshot2.forEach(function (snap) {
                                                //console.log(snap.val().idUser)
                                                idUser = snap.val().idUser,
                                                    nombreUser = snap.val().nombreUser,
                                                    nombrePlato = snap.val().nombrePlato,
                                                    celular = snap.val().celular,
                                                    //direccion=snap.val().direccion,
                                                    imagen = snap.val().imagen,
                                                    nota = snap.val().nota,
                                                    estado = snap.val().estado,
                                                    //zona=snap.val().zona,
                                                    opcion = snap.val().opcion,
                                                    pago = 'con Membresía',
                                                    precio = snap.val().precio,
                                                    cantidad = snap.val().cantidad,
                                                    //this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, 0, zona, direccion)
                                                    //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, 0);
                                                    _this.profileProvider.getUserProfile().child('carrito').remove();
                                                return false;
                                            });
                                        });
                                        _this.pedidoHecho();
                                    }
                                }
                                else if (data == 'efectivo') {
                                    _this.profileProvider.getUserProfile().child('carrito').once('value', function (userProfileSnapshot2) {
                                        userProfileSnapshot2.forEach(function (snap) {
                                            //console.log(snap.val().idUser)
                                            idUser = snap.val().idUser,
                                                nombreUser = snap.val().nombreUser,
                                                nombrePlato = snap.val().nombrePlato,
                                                celular = snap.val().celular,
                                                //direccion=snap.val().direccion,
                                                imagen = snap.val().imagen,
                                                nota = snap.val().nota,
                                                estado = snap.val().estado,
                                                //zona=snap.val().zona,
                                                opcion = snap.val().opcion,
                                                pago = 'con Efectivo',
                                                precio = snap.val().precio;
                                            // this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio, zona, direccion)
                                            //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio)
                                            _this.profileProvider.getUserProfile().child('carrito').remove();
                                            return false;
                                        });
                                    });
                                    _this.pedidoHecho();
                                    return false;
                                }
                                else if (data == 'fiado') {
                                    // this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
                                    //   userProfileSnapshot2.forEach(snap => {
                                    //     //console.log(snap.val().idUser)
                                    //     idUser=snap.val().idUser,
                                    //     nombreUser=snap.val().nombreUser,
                                    //     nombrePlato=snap.val().nombrePlato,
                                    //     celular=snap.val().celular,
                                    //     direccion=snap.val().direccion,
                                    //     imagen=snap.val().imagen,
                                    //     nota=snap.val().nota,
                                    //     estado=snap.val().estado,
                                    //     zona=snap.val().zona,
                                    //     opcion=snap.val().opcion,
                                    //     pago='es Fiado',
                                    //     //this.fiadosProvider.createFiado(idUser, nombreUser, nombrePlato, celular, direccion, imagen, nota, estado, zona, opcion, pago)
                                    //     //this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, direccion, imagen, nota, estado, zona, opcion, pago)
                                    //     return false;
                                    //   });
                                    // });
                                    // this.pedidoHecho();
                                    // return false;
                                }
                                console.log('jedionda');
                            });
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    CarritoPage.prototype.selecDir = function () {
        // var nombrePlato, imagen, precio, idUser, nombreUser, celular,  ;
        // this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
        //   userProfileSnapshot2.forEach(snap => {
        //     //console.log(snap.val().idUser)
        //     idUser=snap.val().idUser,
        //     nombreUser=snap.val().nombreUser,
        //     nombrePlato=snap.val().nombrePlato,
        //     celular=snap.val().celular,
        //     //direccion=snap.val().direccion,
        //     imagen=snap.val().imagen,
        //     //nota=snap.val().nota,
        //     //estado=snap.val().estado,
        //     //zona=snap.val().zona,
        //     //opcion=snap.val().opcion,
        //     //pago='con Efectivo',
        //     precio=snap.val().precio
        //     //this.pedidosProvider.createPedido(nombrePlato, imagen, precio)
        //     // this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
        //     //console.log(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
        //     //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio)
        //     //this.profileProvider.getUserProfile().child('carrito').remove()
        //     return false;
        //   });
        // });
        //this.profileProvider.getUserProfile().child('direcciones').on('value', eventListSnapshot => {
        //   eventListSnapshot.forEach(snap => {
        //     //console.log(snap.val().direccion)
        //     return false;
        //   });
        this.listoCompra();
        // });
    };
    CarritoPage.prototype.listoCompra = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Selecciona una dirección');
        this.profileProvider.getUserProfile().child('direcciones').once('value', function (eventListSnapshot) {
            eventListSnapshot.forEach(function (snap) {
                alert.addInput({
                    type: 'radio',
                    label: snap.val().direccion,
                    value: snap.key,
                    checked: false
                });
                //console.log(snap.val().direccion)
                return false;
            });
        });
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                //console.log(data)
                var idUser, nombreUser, nombrePlato, celular, imagen, estado, pago, precio, cantidad;
                _this.profileProvider.getUserProfile().child('direcciones').child(data).on('value', function (eventListSnapshot) {
                    // console.log(eventListSnapshot.val().detalleDireccion)
                    // console.log(eventListSnapshot.val().direccion)
                    // console.log(eventListSnapshot.val().zona)
                    //var zona = eventListSnapshot.val().zona;
                    var direccion = eventListSnapshot.val().direccion + ' ' + eventListSnapshot.val().detalleDireccion;
                    //this.comoPagar(direccion);
                    _this.profileProvider.getUserProfile().child('carrito').once('value', function (userProfileSnapshot2) {
                        userProfileSnapshot2.forEach(function (snap) {
                            //console.log(snap.val().idUser)
                            idUser = snap.val().idUser,
                                nombreUser = snap.val().nombreUser,
                                nombrePlato = snap.val().nombrePlato,
                                celular = snap.val().celular,
                                //direccion=snap.val().direccion,
                                imagen = snap.val().imagen,
                                //nota=snap.val().nota,
                                //estado=snap.val().estado,
                                //zona=snap.val().zona,
                                //opcion=snap.val().opcion,
                                pago = 'con Efectivo',
                                precio = snap.val().precio,
                                cantidad = snap.val().cantidad,
                                //this.pedidosProvider.createPedido(nombrePlato, imagen, precio)
                                _this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, direccion, cantidad);
                            // this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
                            //console.log(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
                            //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio)
                            _this.profileProvider.getUserProfile().child('carrito').remove();
                            return false;
                        });
                    });
                    _this.pedidoHecho();
                    return false;
                });
                //this.pedidosProvider.updateDomiciliario(data,key);
            }
        });
        alert.present();
    };
    CarritoPage.prototype.presentActionSheet = function (evento) {
        var _this = this;
        //console.log(evento)
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Elemento del carrito',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Quitar',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.preguntaBorrar(evento.idPedido);
                        //this.pedidosProvider.getPedidosDetail(evento.key).remove();
                        //this.navCtrl.push('EventCreatePage', { eventId : });
                    }
                },
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
    CarritoPage.prototype.preguntaBorrar = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '¿Quitar del carrito?',
            message: '¿Deseas quitar este item del carrito?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.profileProvider.getUserProfile().child('carrito').child(id).remove();
                        // try {
                        //   this.navCtrl.pop();
                        // } catch(error){
                        //  this.navCtrl.setRoot(TiendaPage)
                        // }
                    }
                }
            ]
        });
        confirm.present();
    };
    CarritoPage.prototype.pedidoHecho = function () {
        //  try {
        //    this.navCtrl.pop();
        //  } catch(error){
        //    }
        this.profileProvider.getUserProfile().child('carrito').remove();
        var alert = this.alertCtrl.create({
            title: 'Pedido Exitoso',
            subTitle: 'Tu pedido llegará en breve',
            buttons: ['OK']
        });
        alert.present();
        //this.navCtrl.push(TiendaPage)
        this.navCtrl.setRoot(HomePage);
    };
    CarritoPage.prototype.carritoVacio = function () {
        var alert = this.alertCtrl.create({
            title: 'Carrito vacío',
            subTitle: 'El carrito está vacío',
            buttons: ['OK']
        });
        alert.present();
    };
    CarritoPage.prototype.membresiaInsuficiente = function () {
        var alert = this.alertCtrl.create({
            title: 'Oops...!',
            subTitle: 'No tienes suficientes almuerzos en tu membresía para esta opción',
            buttons: ['OK']
        });
        alert.present();
    };
    CarritoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-carrito',
            templateUrl: 'carrito.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ProfileProvider,
            PedidosProvider,
            AlertController,
            ActionSheetController,
            Platform,
            FiadosProvider,
            ContadoresProvider])
    ], CarritoPage);
    return CarritoPage;
}());
export { CarritoPage };
//# sourceMappingURL=carrito.js.map