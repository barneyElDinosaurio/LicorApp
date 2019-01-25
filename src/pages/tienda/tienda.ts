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
import { PlatosControllerProvider } from '../../providers/platos-controller/platos-controller';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { CarritoPage } from '../carrito/carrito';

/**
 * Generated class for the TiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class TiendaPage {

  public platosList: Array<any>;
  public loadedPlatosList: Array<any>;
  public userProfile: any;
  public cantidad: any = 1;

  constructor(
    //private socialSharing: SocialSharing,
    public PlatosControllerProvider: PlatosControllerProvider,
    public fiadosProvider: FiadosProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public view: ViewController,
    public profileProvider: ProfileProvider,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    //public profileProvider: ProfileProvider
  ) { }

  ionViewDidLoad() {

    const item = this.navParams.get('data');
    const itemW = this.navParams.get('dataW');

    if(itemW == false) {
      this.PlatosControllerProvider.getPlatosList().on('value', eventListSnapshot => {
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
    } else {

      this.PlatosControllerProvider.getPlatosList().orderByChild("categoria").equalTo(item).on('value', eventListSnapshot => {
        this.platosList = [];
        eventListSnapshot.forEach(snap => {
          this.platosList.push({
              id: snap.key,
              nombre: snap.val().nombre,
              descripcion: snap.val().descripcion,
              precio: snap.val().precio,
              imagen: snap.val().imagen,
              //color: snap.val().color
          });
          return false;
        });
        //this.platosList = platosList;
        this.loadedPlatosList = this.platosList;
      });
    // this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
    //   this.userProfile = userProfileSnapshot.val();
    //   console.log(this.userProfile)
    // });
    }
  }

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

  alCarrito(){
    this.navCtrl.push(CarritoPage)
  }

  alertaAñadido() {
    let alert = this.alertCtrl.create({
      title: 'Listo!',
      subTitle: 'Ha sido añadido al carrito!',
      buttons: ['OK']
    });
    alert.present();
  }

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

  dismiss() {
    this.view.dismiss();
  }

  crearSubCategoria(idProducto){
    let alert = this.alertCtrl.create();
    alert.setTitle('Escoge la categoria');
    this.fiadosProvider.getCatsList().on('value', snap=>{
      snap.forEach(snapy=>{
        alert.addInput({
          type: 'radio',
          label: snapy.val().nombre,
          value: snapy.key,
          checked: false
        });
        return false;
      })
    })

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log('escoge:' + data)
        this.asginarSubCat(data, idProducto);
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });
    alert.present();
    //console.log(snapy.val().nombre)
  }

  asginarSubCat(eventCategoria: any, idProducto:string)  {

    let alert = this.alertCtrl.create();
    alert.setTitle('Escoge la sub-categoria');
    this.fiadosProvider.getCatsList().child(eventCategoria).child('subcategorias').on('value', snap=>{
      snap.forEach(snapy=>{
        console.log(snapy.val())
        alert.addInput({
          type: 'radio',
          label: snapy.val().subcategoria,
          value: snapy.key,
          checked: false
        });
        return false;
      })
    })

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log('escoge:' + data)
        //eventCategoria = eventCategoria +'-'+ data;
        //this.PlatosControllerProvider.updateCategoria(eventCategoria, idProducto)

        // this.upload2(eventName, eventDescripcion, eventPrecio, eventCategoria);
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });
    alert.present();
  }

  presentActionSheet(evento) {
      console.log(evento.id)
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modifica este plato',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Cambiar de categoria',
          icon: !this.platform.is('ios') ? 'construct' : null,
          handler: () => {
            this.crearSubCategoria(evento.id)
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
          handler: () => {
            console.log('Delete clicked');
            this.PlatosControllerProvider.getPlatoDetail(evento.id).remove();
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
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm(evento) {
    //console.log(evento)
    let confirm = this.alertCtrl.create({
      title: '¿Poner en la tienda?',
      message: 'Lo podrán pedir los usuarios',
      inputs:[
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
          handler: () => {

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
          handler: data => {
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
  }
  // facebookShare() {
  //   this.socialSharing.shareViaFacebook("Fit Lunch es lo maximo", null, null).then(() => {
  //     console.log("shareViaFacebook: Success");
  //   }).catch(() => {
  //     console.error("shareViaFacebook: failed");
  //   });
  // }
  // instagramShare() {
  //   this.socialSharing.shareViaInstagram("Fit Lunch es lo maximo", null).then(() => {
  //     console.log("shareViaFacebook: Success");
  //   }).catch(() => {
  //     console.error("shareViaFacebook: failed");
  //   });
  // }
  // twitterShare() {
  //   this.socialSharing.shareViaTwitter("Fit Lunch es lo maximo", null, null).then(() => {
  //     console.log("shareViaFacebook: Success");
  //   }).catch(() => {
  //     console.error("shareViaFacebook: failed");
  //   });
  // }

    //notaPedido(): void {
    // const alert: Alert = this.alertCtrl.create({
    //   title:'Notas al cheff',
    //   message: '¿Alguna sugerencia para tu pedido?',
    //   inputs: [
    //     {
    //       name: 'nota',
    //       placeholder: 'Escribe tu sugerencia',
    //       value: this.userProfile.nota
    //     }
    //   ],
    //   buttons: [
    //     { text: 'Cancelar' },
    //     {
    //       text: 'Guardar',
    //       handler: data => {
    //         this.profileProvider.updateNotas( data.nota );
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  //}


}
