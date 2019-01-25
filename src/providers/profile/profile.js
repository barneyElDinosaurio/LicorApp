var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ProfileProvider = /** @class */ (function () {
    function ProfileProvider() {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser = user;
                _this.userProfile = firebase.database().ref("/userProfile/" + user.uid);
                _this.almuerzosRef = firebase.database().ref("/userProfile/" + user.uid + "/almuerzos");
            }
        });
    }
    ProfileProvider.prototype.getUserProfile = function () {
        return this.userProfile;
    };
    ProfileProvider.prototype.addCarrito = function (evento, dir, 
    // //nota: string,
    wasap, idUser, nombreUser, cantidad) {
        return this.userProfile.child('carrito').push({
            nombrePlato: evento.nombre,
            nombreUser: nombreUser,
            imagen: evento.imagen,
            direccion: dir,
            //nota: nota,
            celular: wasap,
            idUser: idUser,
            cantidad: cantidad,
            // estado: 'En preparación',
            //opcion: evento.opcion,
            //zona: zona,
            precio: evento.precio * cantidad
        });
    };
    ProfileProvider.prototype.updateTipoMembresia = function (membresia) {
        return this.userProfile.update({ membresia: membresia });
    };
    ProfileProvider.prototype.updateToken = function (token) {
        return this.userProfile.update({ token: token });
    };
    ProfileProvider.prototype.updateCantidad = function (cantidad) {
        return this.almuerzosRef.transaction(function (almuerzos) {
            return almuerzos + cantidad;
        });
    };
    ProfileProvider.prototype.updateZona = function (zona) {
        return this.userProfile.update({ zona: zona });
    };
    ProfileProvider.prototype.updateCelular = function (celular) {
        return this.userProfile.update({ celular: celular });
    };
    ProfileProvider.prototype.updateName = function (firstName, lastName) {
        return this.userProfile.update({ firstName: firstName, lastName: lastName });
    };
    ProfileProvider.prototype.updateAddress = function (direccion, detalleDireccion) {
        return this.userProfile.update({ direccion: direccion, detalleDireccion: detalleDireccion });
    };
    ProfileProvider.prototype.anadirDireccion = function (direccion, detalleDireccion) {
        return this.userProfile.child('direcciones').push({ direccion: direccion, detalleDireccion: detalleDireccion });
    };
    ProfileProvider.prototype.updateNotas = function (nota) {
        return this.userProfile.update({ nota: nota });
    };
    ProfileProvider.prototype.updateDOB = function (birthDate) {
        return this.userProfile.update({ birthDate: birthDate });
    };
    ProfileProvider.prototype.updateEmail = function (newEmail, password) {
        var _this = this;
        var credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);
        return this.currentUser
            .reauthenticateWithCredential(credential)
            .then(function (user) {
            _this.currentUser.updateEmail(newEmail).then(function (user) {
                _this.userProfile.update({ email: newEmail });
            });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ProfileProvider.prototype.borrarCuenta = function (oldPassword) {
        var _this = this;
        this.userProfile.remove();
        var credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);
        return this.currentUser
            .reauthenticateWithCredential(credential)
            .then(function (user) {
            _this.currentUser.delete().then(function () {
                console.log('Usuario eliminado');
            });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ProfileProvider.prototype.updatePassword = function (newPassword, oldPassword) {
        var _this = this;
        var credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);
        return this.currentUser
            .reauthenticateWithCredential(credential)
            .then(function (user) {
            _this.currentUser.updatePassword(newPassword).then(function (user) {
                console.log('Password Changed');
            });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ProfileProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ProfileProvider);
    return ProfileProvider;
}());
export { ProfileProvider };
//# sourceMappingURL=profile.js.map