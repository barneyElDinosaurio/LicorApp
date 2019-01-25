import { Component } from '@angular/core';
import firebase from 'firebase';
import { IonicPage,
  NavController,
  NavParams,
  Platform,
  MenuController,
  AlertController ,
  ModalController,
  ActionSheetController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { ModalContentPage } from '../modal-content/modal-content';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { TiendaPage } from '../tienda/tienda';
import { MenuDiaPage } from '../menu-dia/menu-dia';

// import { PerfilPage } from '../perfil/perfil';
// import { TiendaPage } from '../tienda/tienda';
// import { OrdenesPage } from '../ordenes/ordenes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public catsList:Array<any>;
  

  constructor(public navCtrl: NavController,
              public fiadosProvider: FiadosProvider,
              public menuCtrl:MenuController,
              public navParams: NavParams,
              public profileProvider: ProfileProvider,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController
            ) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
this.menuCtrl.toggle();
    //console.log('jedionda')
    //setTimeout(this.cargaCats(), 3000);
    //let alert = this.alertCtrl.create({
      //title: 'Vistia www.ultraki.com!',
      //subTitle: 'Visita www.fitlunch.co',
      //buttons: ['OK']
      //buttons: ['OK']
      //   {
      //     text: 'OK',
      //     icon: !this.platform.is('ios') ? 'power' : null,
      //     handler: () => {
      //       console.log('jediondisima')
      //       this.funcionjedionda();
      //     }
      //   }
      // ]
    //});
    //alert.present();

    setTimeout(()=>{
      //this.imagenesProvider.getImagenesSpecificList('inicio').on('value', eventListSnapshot => {
        //this.imageListInicio = [];
        //eventListSnapshot.forEach(snap => {

          //return false;
        //})
      //})
      this.cargaCats();
      //alert.dismiss();
    }, 1000);


    // this.fiadosProvider.getUsersList().on('value', eventListSnapshot => {
    //
    //   this.usersList = [];
    //   eventListSnapshot.forEach(snap => {
    //     this.usersList.push({
    //         key: snap.key,
    //         nombre: snap.val().firstName
    //     });
    //     return false;
    //   });
    // });
  }

  cargaCats(){
    this.fiadosProvider.getCatsList().on('value', snap=>{
      this.catsList = [];
      snap.forEach(snapy=>{
        //console.log( snapy.key )
        this.catsList.push({
            key: snapy.key,
            nombre: snapy.val().nombre
        });
        return false;
      })
    })
  }

  verTodos() {
    //console.log(item)
    let modal = this.modalCtrl.create(TiendaPage, {dataW: false});
    modal.present();
  }

  verMenuDia() {
    let modal = this.modalCtrl.create(MenuDiaPage, {dataW: false});
    modal.present();    
  }

  muestraPedidos(dataEntrante) {
      //muestraPedidos(dataEntrante) {
      //const item = this.navParams.get('data');
      var superKey = dataEntrante;
      //let modal = this.modalCtrl.create(TiendaPage, {data: superKey});
      //modal.present();
	  console.log(superKey)
     let modal = this.modalCtrl.create(ModalContentPage, {data: superKey});
     modal.present();
  }


}
