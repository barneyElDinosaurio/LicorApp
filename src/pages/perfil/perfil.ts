import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Alert,
  AlertController,
  NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { MembresiaProvider } from '../../providers/membresia/membresia';


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public userProfile: any;
  public birthDate: string;
  public almuerzosUser: Array<any>;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public authProvider: AuthProvider,
     public profileProvider: ProfileProvider,
     public membresiaProvider: MembresiaProvider
   ) { }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      //this.birthDate = userProfileSnapshot.val().birthDate;
    });

    this.profileProvider.getUserProfile().child('direcciones').on('value', direccionesSnapshot => {
      this.almuerzosUser = [];
      direccionesSnapshot.forEach(snap=>{
        this.almuerzosUser.push({
          id: snap.key,
          direccion: snap.val().direccion,
          detalle: snap.val().detalleDireccion,
          zona: snap.val().zona
        })
        return false;
      })
      //console.log(this.almuerzosUser)
      //this.birthDate = userProfileSnapshot.val().birthDate;
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
  detectaMembresia(): void {
    const alert: Alert = this.alertCtrl.create({
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
          handler: data => {
            var a;
            this.membresiaProvider.getMembresiaDetail(data.codigo).once('value', eventListSnapshot => {
              a = eventListSnapshot.exists();
              //console.log(a)
              if(a) {
                this.profileProvider.updateTipoMembresia(eventListSnapshot.val().nombre);
                this.profileProvider.updateCantidad(eventListSnapshot.val().cantidad);
              } else {
                let alert = this.alertCtrl.create({
                  title: 'Oops...!',
                  subTitle: 'Parece que tu codigo no existe o ya fue usado!',
                  buttons: ['OK']
                });
                alert.present();
              }
            });
            if(a) {
              setTimeout(() => {
                this.membresiaProvider.getMembresiaDetail(data.codigo).remove();
              }, 2500);
            }
              // console.log(eventListSnapshot.val().nombre);
              // console.log(eventListSnapshot.val().cantidad);
          }
        }
      ]
    });
    alert.present();

  }

    gestionDireccion(pedido){
      console.log(pedido.id)
      this.profileProvider.getUserProfile().child('direcciones').child(pedido.id).remove();
      // this.profileProvider.getUserProfile().child('direcciones').on('value', eventListSnapshot => {
      //   eventListSnapshot.forEach(snap => {
      //     //console.log(snap.val().direccion)
      //     return false;
      //   });
      // });
      // this.listo2();
    }

    listo2() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Selecciona una direccion');
      this.profileProvider.getUserProfile().child('direcciones').on('value', eventListSnapshot => {
        eventListSnapshot.forEach(snap => {
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
        handler: data => {
          console.log(data)
          this.profileProvider.getUserProfile().child('direcciones').child(data).remove()
          //this.pedidosProvider.updateDomiciliario(data,key);
        }
      });
      alert.present();
    }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
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
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateCelular(): void {
    const alert: Alert = this.alertCtrl.create({
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
          handler: data => {
            this.profileProvider.updateCelular(data.celular);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate: string): void {
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newEmail', placeholder: 'Tu nuevo correo' },
        { name: 'password', placeholder: 'Tu contraseña', type: 'password' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          }
        }
      ]
    });
    alert.present();
  }

  borrarCuenta(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'oldPassword', placeholder: 'Introduce tu Contraseña', type: 'password' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          handler: data => {
            this.profileProvider.borrarCuenta(
              //data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'Nueva Contraseña', type: 'password' },
        { name: 'oldPassword', placeholder: 'Vieja Contraseña', type: 'password' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  //actualizarDireccion   --> Asi se llamaba antes
  anadirDireccion(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Dirección nueva',
      inputs: [
        {
          name: 'direccion',
          placeholder: 'Dirección',
          //value: this.userProfile.direccion
        },
        {
          name: 'detalleDireccion',
          placeholder: '¿Algun detalle?',
          //value: this.userProfile.detalleDireccion
        }
      ],

      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            // this.actualizarZona(data.direccion, data.detalleDireccion);
            this.profileProvider.anadirDireccion(data.direccion, data.detalleDireccion);
            this.confirmaDir();
          }
        }
      ]
    });
    alert.present();
  }

  actualizarZona(direccion, detalleDireccion) {
    let alert = this.alertCtrl.create();
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
      handler: data => {
        //this.profileProvider.updateZona(data);
        this.profileProvider.anadirDireccion(direccion, detalleDireccion);
        this.confirmaDir();

        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });
    alert.present();
  }

  confirmaDir() {
      let alert = this.alertCtrl.create({
        title: 'Direccion agregada!',
        subTitle: 'Puedes agregar tantas como necesites!',
        buttons: ['OK']
      });
      alert.present();
    }

}
