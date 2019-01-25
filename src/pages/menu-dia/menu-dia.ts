import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Alert,
  ViewController,
  AlertController,
  Platform,
  ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ProfileProvider } from '../../providers/profile/profile';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { CarritoPage } from '../carrito/carrito';
import { MenuDiaProvider } from '../../providers/menu-dia/menu-dia';


/**
 * Generated class for the MenuDiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-dia',
  templateUrl: 'menu-dia.html',
})
export class MenuDiaPage {

  public platosList: Array<any>;
  public loadedPlatosList: Array<any>;
  public userProfile: any;
  public cantidad: any = 1;

  constructor(
    public menuDiaProvider: MenuDiaProvider,
    public fiadosProvider: FiadosProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public view: ViewController,
    public profileProvider: ProfileProvider,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
  	) { }

  ionViewDidLoad() {
      this.menuDiaProvider.getPlatosList().on('value', eventListSnapshot => {
        this.platosList = [];
        eventListSnapshot.forEach(snap => {
          this.platosList.push({
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
        this.loadedPlatosList = this.platosList;
      });
     }

  dismiss() {
    this.view.dismiss();
  }

  addCantidad(cuanto) {
    if(this.cantidad == 1 && cuanto < 0 ) {
      this.cantidad = 1;
    } else {
      this.cantidad += cuanto;
    }
  }

  addCarrito(evento){

    //console.log(evento);
    // if(evento.opcion == 'Premium') {
    //   setTimeout(()=>this.esPremium(), 1000);
    // }
    // this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
    //   console.log('jedionda')
    //
    //   });
    this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
    if(userProfileSnapshot.val().firstName == undefined ||
       userProfileSnapshot.val().lastName == undefined ||
       userProfileSnapshot.val().celular == undefined ) {
       //userProfileSnapshot.val().zona ==undefined ||
       //userProfileSnapshot.val().direccion ==undefined) {
         let alert = this.alertCtrl.create({
           title: 'Oops...!',
           subTitle: 'Nos faltan algunos datos, por favor llena tu perfil con nombre completo, celular y dirección.',
           buttons: ['OK']
         });
         alert.present();
         return false;
       }
      var dir = userProfileSnapshot.val().direccion + ' ' + userProfileSnapshot.val().detalleDireccion;
      //var nota = userProfileSnapshot.val().nota;
      var wasap = userProfileSnapshot.val().celular;
      var nombreUser = userProfileSnapshot.val().firstName + ' ' + userProfileSnapshot.val().lastName;
      var idUser = userProfileSnapshot.key;
      //var zona = userProfileSnapshot.val().zona;
      console.log(evento)
       this.profileProvider.addCarrito(evento,dir,wasap,idUser, nombreUser, this.cantidad);
      //this.profileProvider.addCarrito(evento);
      this.alertaAñadido();
    });
  }

  alertaAñadido() {
    let alert = this.alertCtrl.create({
      title: 'Listo!',
      subTitle: 'Ha sido añadido al carrito!',
      buttons: ['OK']
    });
    alert.present();
  }


}
