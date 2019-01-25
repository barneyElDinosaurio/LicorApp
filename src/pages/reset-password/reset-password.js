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
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResetPasswordPage = /** @class */ (function () {
    function ResetPasswordPage(navCtrl, navParams, authProvider, alertCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.alertCtrl = alertCtrl;
        this.resetPasswordForm = formBuilder.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ]
        });
    }
    ResetPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log("Form is not valid yet, current value: " + this.resetPasswordForm.value);
        }
        else {
            var email = this.resetPasswordForm.value.email;
            this.authProvider.resetPassword(email).then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: 'Revisa tu email para restablecer tu contraseña',
                    buttons: [
                        {
                            text: 'Ok',
                            role: 'cancelar',
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert.present();
            }, function (error) {
                var errorAlert = _this.alertCtrl.create({
                    message: error.message,
                    buttons: [{ text: 'Ok', role: 'cancelar' }]
                });
                errorAlert.present();
            });
        }
    };
    ResetPasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-reset-password',
            templateUrl: 'reset-password.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AuthProvider,
            AlertController,
            FormBuilder])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());
export { ResetPasswordPage };
//# sourceMappingURL=reset-password.js.map