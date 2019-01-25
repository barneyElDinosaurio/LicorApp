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
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
// import { FCM } from '@ionic-native/fcm';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider(googleplus) {
        this.googleplus = googleplus;
    }
    AuthProvider.prototype.loginUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.signupUser = function (email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            //this.fcm.getToken().then(token=>{
            firebase.database().ref("/userProfile/" + newUser.uid + "/email").set(email);
            firebase.database().ref("/userProfile/" + newUser.uid + "/membresia").set('REGULAR');
            firebase.database().ref("/userProfile/" + newUser.uid + "/almuerzos").set(0);
            //firebase.database().ref(`/userProfile/${newUser.uid}/token`).set(token);
            //console.log(token)
            //})
        })
            .catch(function (error) {
            console.error(error);
            throw new Error(error);
        });
    };
    AuthProvider.prototype.loginGoogle = function () {
        //console.log('jedionda')
        this.googleplus.login({
            'webClientId': '1047334742952-u8flufmbbd1vim92e4mjglv4lkcidt36.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                .then(function (newUser) {
                //console.log()
                firebase.database().ref("/userProfile/" + newUser.uid + "/email").set(newUser.email);
                firebase.database().ref("/userProfile/" + newUser.uid + "/membresia").set('REGULAR');
                firebase.database().ref("/userProfile/" + newUser.uid + "/almuerzos").set(0);
                console.log('epaa');
            }).catch(function (ns) {
                console.log('nope');
            });
        });
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.logoutUser = function () {
        var userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("/userProfile/" + userId)
            .off();
        return firebase.auth().signOut();
    };
    AuthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GooglePlus])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=auth.js.map