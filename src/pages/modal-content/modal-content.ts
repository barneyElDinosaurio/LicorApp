import { Component } from '@angular/core';
import firebase from 'firebase';
import { IonicPage,
  NavController,
  NavParams,
  Platform,
  AlertController ,
  ModalController,
  ViewController,
  ActionSheetController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { TiendaPage } from '../tienda/tienda';

/**
 * Generated class for the ModalContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  public pedidosList: Array<any>;
	public item: any;
  constructor(public navCtrl: NavController,
              public fiadosProvider: FiadosProvider,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public pedidosProvider: PedidosProvider,
              public view: ViewController
              ) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('data');
	console.log(this.item)
	console.log(this.item.nombre)
	console.log('la rejedionda')
    //console.log(item);
    // let alert = this.alertCtrl.create();
    this.fiadosProvider.getCatsList().child(this.item.key).child('subcategorias').on('value', eventListSnapshot => {
    //console.log( eventListSnapshot.val() )
      this.pedidosList = [];
      eventListSnapshot.forEach(snap => {
        //console.log( snap.val().subcategoria )
        this.pedidosList.push({
            subcat: snap.val().subcategoria,
            key: snap.key
        });
        // this.celularUser = 'whatsapp://send?phone=57'+snap.val().celular;
        // this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.celularUser);
        return false;
      });
    });
    // console.log('ionViewDidLoad ModalContentPage');
  }

  dismiss() {
    this.view.dismiss();
  }

  muestraPedidos(dataEntrante) {
	
	const item = this.navParams.get('data');
    var superKey = (item.key+'-'+dataEntrante.key)
    let modal = this.modalCtrl.create(TiendaPage, {data: superKey});
    modal.present();

    //console.log(item.key);
    //console.log(dataEntrante.key);
  }

}
