import { Component } from '@angular/core';
//import firebase from 'firebase';
import { IonicPage,
        NavController,
        NavParams,
        Platform,
        ActionSheetController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})

export class OrdenesPage {

  public pedidosList: Array<any>;
  public userProfile: any;
  qrData = null;
  createdCode = null;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    public pedidosProvider: PedidosProvider,
    public actionSheetCtrl: ActionSheetController,

  ) {
  }

  ionViewDidLoad() {

    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      //this.userProfile = userProfileSnapshot.val();
      //console.log()
      this.pedidosProvider.getPedidosList().orderByChild("idUser").equalTo(userProfileSnapshot.key).on('value', eventListSnapshot => {
        this.pedidosList = [];
        eventListSnapshot.forEach(snap => {
          this.pedidosList.push({
              idPedido: snap.key,
              //domiciliario: snap.val().domiciliario,
              idUser: snap.val().idUser,
              nombreUser: snap.val().nombreUser,
              nombrePlato: snap.val().nombrePlato,
              precio: snap.val().precio,
              cantidad: snap.val().cantidad,
              celular: snap.val().celular,
              direccion: snap.val().direccion,
              imagen: snap.val().imagen,
              nota: snap.val().nota,
              estado: snap.val().estado
          });
          return false;
        });
      });
    });
  }

  presentActionSheet(evento) {
    //console.log(evento.idPedido)
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Tu pedido',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Confirmar entrega',
          icon: !this.platform.is('ios') ? 'checkbox-outline' : null,
          handler: () => {

            this.createdCode = evento.idPedido;
          }
        },
        // {
        //   text: 'Borrar',
        //   role: 'destructive',
        //   icon: !this.platform.is('ios') ? 'trash' : null,
        //   handler: () => {
        //     console.log('Delete clicked');
        //     this.PlatosControllerProvider.getPlatoDetail(evento.id).remove();
        //   }
        // },
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

}
