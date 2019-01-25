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
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { MembresiaProvider } from '../../providers/membresia/membresia';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, alertCtrl, authProvider, profileProvider, membresiaProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.profileProvider = profileProvider;
        this.membresiaProvider = membresiaProvider;
    }
    PerfilPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileProvider.getUserProfile().on('value', function (userProfileSnapshot) {
            _this.userProfile = userProfileSnapshot.val();
            //this.birthDate = userProfileSnapshot.val().birthDate;
        });
        this.profileProvider.getUserProfile().child('direcciones').on('value', function (direccionesSnapshot) {
            _this.almuerzosUser = [];
            direccionesSnapshot.forEach(function (snap) {
                _this.almuerzosUser.push({
                    id: snap.key,
                    direccion: snap.val().direccion,
                    detalle: snap.val().detalleDireccion,
                    zona: snap.val().zona
                });
                return false;
            });
            //console.log(this.almuerzosUser)
            //this.birthDate = userProfileSnapshot.val().birthDate;
        });
    };
    PerfilPage.prototype.logOut = function () {
        var _this = this;
        this.authProvider.logoutUser().then(function () {
            _this.navCtrl.setRoot('LoginPage');
        });
    };
    PerfilPage.prototype.detectaMembresia = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Introduce tu codigo aquí',
            inputs: [
                {
                    name: 'codigo',
                    placeholder: 'Pega el codigo'
                    //value: this.userProfile.codigo
                }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Añadir',
                    handler: function (data) {
                        var a;
                        _this.membresiaProvider.getMembresiaDetail(data.codigo).once('value', function (eventListSnapshot) {
                            a = eventListSnapshot.exists();
                            //console.log(a)
                            if (a) {
                                _this.profileProvider.updateTipoMembresia(eventListSnapshot.val().nombre);
                                _this.profileProvider.updateCantidad(eventListSnapshot.val().cantidad);
                            }
                            else {
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Oops...!',
                                    subTitle: 'Parece que tu codigo no existe o ya fue usado!',
                                    buttons: ['OK']
                                });
                                alert_1.present();
                            }
                        });
                        if (a) {
                            setTimeout(function () {
                                _this.membresiaProvider.getMembresiaDetail(data.codigo).remove();
                            }, 2500);
                        }
                        // console.log(eventListSnapshot.val().nombre);
                        // console.log(eventListSnapshot.val().cantidad);
                    }
                }
            ]
        });
        alert.present();
    };
    PerfilPage.prototype.gestionDireccion = function (pedido) {
        console.log(pedido.id);
        this.profileProvider.getUserProfile().child('direcciones').child(pedido.id).remove();
        // this.profileProvider.getUserProfile().child('direcciones').on('value', eventListSnapshot => {
        //   eventListSnapshot.forEach(snap => {
        //     //console.log(snap.val().direccion)
        //     return false;
        //   });
        // });
        // this.listo2();
    };
    PerfilPage.prototype.listo2 = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Selecciona una direccion');
        this.profileProvider.getUserProfile().child('direcciones').on('value', function (eventListSnapshot) {
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
            text: 'Eliminar',
            handler: function (data) {
                console.log(data);
                _this.profileProvider.getUserProfile().child('direcciones').child(data).remove();
                //this.pedidosProvider.updateDomiciliario(data,key);
            }
        });
        alert.present();
    };
    PerfilPage.prototype.updateName = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Completa tu Nombre y Apellido',
            inputs: [
                {
                    name: 'firstName',
                    placeholder: 'Nombre',
                    value: this.userProfile.firstName
                },
                {
                    name: 'lastName',
                    placeholder: 'Apellido',
                    value: this.userProfile.lastName
                }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Guardar',
                    handler: function (data) {
                        _this.profileProvider.updateName(data.firstName, data.lastName);
                    }
                }
            ]
        });
        alert.present();
    };
    PerfilPage.prototype.updateCelular = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '¿Donde podemos llamarte?',
            inputs: [
                {
                    name: 'celular',
                    placeholder: 'WhatsApp o Celular',
                    value: this.userProfile.celular
                }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Guardar',
                    handler: function (data) {
                        _this.profileProvider.updateCelular(data.celular);
                    }
                }
            ]
        });
        alert.present();
    };
    PerfilPage.prototype.updateDOB = function (birthDate) {
        this.profileProvider.updateDOB(birthDate);
    };
    PerfilPage.prototype.updateEmail = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [
                { name: 'newEmail', placeholder: 'Tu nuevo correo' },
                { name: 'password', placeholder: 'Tu contraseña', type: 'password' }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Guardar',
                    handler: function (data) {
                        _this.profileProvider
                            .updateEmail(data.newEmail, data.password)
                            .then(function () {
                            console.log('Email Changed Successfully');
                        })
                            .catch(function (error) {
                            console.log('ERROR: ' + error.message);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    PerfilPage.prototype.borrarCuenta = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [
                { name: 'oldPassword', placeholder: 'Introduce tu Contraseña', type: 'password' }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Eliminar',
                    handler: function (data) {
                        _this.profileProvider.borrarCuenta(
                        //data.newPassword,
                        data.oldPassword);
                    }
                }
            ]
        });
        alert.present();
    };
    PerfilPage.prototype.updatePassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [
                { name: 'newPassword', placeholder: 'Nueva Contraseña', type: 'password' },
                { name: 'oldPassword', placeholder: 'Vieja Contraseña', type: 'password' }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Guardar',
                    handler: function (data) {
                        _this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
                    }
                }
            ]
        });
        alert.present();
    };
    //actualizarDireccion   --> Asi se llamaba antes
    PerfilPage.prototype.anadirDireccion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Dirección nueva',
            inputs: [
                {
                    name: 'direccion',
                    placeholder: 'Dirección',
                },
                {
                    name: 'detalleDireccion',
                    placeholder: '¿Algun detalle?',
                }
            ],
            buttons: [
                { text: 'Cancelar' },
                {
                    text: 'Guardar',
                    handler: function (data) {
                        // this.actualizarZona(data.direccion, data.detalleDireccion);
                        _this.profileProvider.anadirDireccion(data.direccion, data.detalleDireccion);
                        _this.confirmaDir();
                    }
                }
            ]
        });
        alert.present();
    };
    PerfilPage.prototype.actualizarZona = function (direccion, detalleDireccion) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Zona de la ciudad en que estás');
        alert.addInput({
            type: 'radio',
            label: 'Sur',
            value: 'Sur',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Norte',
            value: 'Norte',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Oeste',
            value: 'Oeste',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Centro',
            value: 'Centro',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Universidades',
            value: 'Universidades',
            checked: false
        });
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                //this.profileProvider.updateZona(data);
                _this.profileProvider.anadirDireccion(direccion, detalleDireccion);
                _this.confirmaDir();
                //this.testRadioOpen = false;
                //this.testRadioResult = data;
            }
        });
        alert.present();
    };
    PerfilPage.prototype.confirmaDir = function () {
        var alert = this.alertCtrl.create({
            title: 'Direccion agregada!',
            subTitle: 'Puedes agregar tantas como necesites!',
            buttons: ['OK']
        });
        alert.present();
    };
    PerfilPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-perfil',
            templateUrl: 'perfil.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            AuthProvider,
            ProfileProvider,
            MembresiaProvider])
    ], PerfilPage);
    return PerfilPage;
}());
export { PerfilPage };
//# sourceMappingURL=perfil.js.map