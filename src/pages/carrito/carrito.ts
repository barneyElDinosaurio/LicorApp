import { Component } from '@angular/core';
import { IonicPage,
        NavController,
        NavParams,
        AlertController,
        Platform,
        ActionSheetController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { FiadosProvider } from '../../providers/fiados/fiados';
import { HomePage } from '../home/home';
import { OrdenesPage } from '../ordenes/ordenes';
import { TiendaPage } from '../tienda/tienda';
import { ContadoresProvider } from '../../providers/contadores/contadores';
/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  public carritoList: Array<any>;
  public userProfile: any;
  public cuantosPide: number;
  public precioTotal: number;
  public totalFinal: number;
  public domicilio: number;
  public horaCierre: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    public pedidosProvider: PedidosProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public fiadosProvider: FiadosProvider,
    public contadoresProvider: ContadoresProvider,

  ) {  }

  ionViewDidLoad() {

    this.profileProvider.getUserProfile().child('direcciones').on('value', eventListSnapshot => {
      eventListSnapshot.forEach(snap => {
        //console.log(snap.val().direccion)
        return false;
      });
     //this.listoCompra();
    });

    var precio;
    this.profileProvider.getUserProfile().child('carrito').on('value', userProfileSnapshot => {
      this.cuantosPide = 0;
      this.precioTotal = 0;
      //this.userProfile = userProfileSnapshot.val();
      //console.log()
      //this.pedidosProvider.getPedidosList().orderByChild("idUser").equalTo(userProfileSnapshot.key).on('value', eventListSnapshot => {
        this.carritoList = [];
        userProfileSnapshot.forEach(snap => {
          this.carritoList.push({
              idPedido: snap.key,
              //domiciliario: snap.val().domiciliario,
              idUser: snap.val().idUser,
              nombreUser: snap.val().nombreUser,
              nombrePlato: snap.val().nombrePlato,
              celular: snap.val().celular,
              direccion: snap.val().direccion,
              imagen: snap.val().imagen,
              nota: snap.val().nota,
              estado: snap.val().estado,
              zona: snap.val().zona,
              opcion: snap.val().opcion,
              precio: snap.val().precio,
              cantidad: snap.val().cantidad,
          });
          precio = snap.val().precio;
          if(snap.val().nota=='Jugo'){
            precio = parseInt(snap.val().precio) + 1000;
          }

          this.precioTotal += parseInt(precio);

          this.cuantosPide += 1;
          return false;
        });
        //
        this.contadoresProvider.getContadoresNodo('precioDomi').once('value', domiSnap => {
          this.domicilio = domiSnap.val();
          this.totalFinal = this.precioTotal+ parseInt(domiSnap.val());
        });
      //});
    });
  }

  comoPagar(zona, direccion) {
    if(this.cuantosPide == 0) {
      this.carritoVacio();
      return false;
    }
    //console.log(evento)
    let confirm = this.alertCtrl.create({
      title: '¿Cómo deseas pagar?',
      subTitle: 'Pagas '+ this.cuantosPide +' almuerzo(s) por $' + this.precioTotal.toLocaleString(),
      message: 'Puedes usar almuerzos de tu plan o pagar el precio al repartidor',
      inputs:[
        {
          type: 'radio',
          label: 'Plan',
          value: 'membresia',
          checked: true
        },
        {
          type: 'radio',
          label: 'En efectivo',
          value: 'efectivo',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            //console.log('2-> '+evento)
            //this.PlatosControllerProvider.updateEstado('enLista', evento)
            //this.PlatosControllerProvider.updateColor('danger', evento)
          }
        },
        {
          text: 'Pedir',
          handler: data => {
            //console.log(data)
            var d = new Date();
            var hora = d.getHours();
            var idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio, cantidad;
            this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
              //var dir = userProfileSnapshot.val().direccion;
              //var nota = userProfileSnapshot.val().nota;
              var wasap = userProfileSnapshot.val().celular;
              var nombreUser = userProfileSnapshot.val().firstName + ' ' + userProfileSnapshot.val().lastName;
              var idUser = userProfileSnapshot.key;
              //var zona = userProfileSnapshot.val().zona;
              var horaCierre;
              var permiso = false;
              this.contadoresProvider.getContadoresNodo('horaCierre').once('value', horaSnap => {
                this.horaCierre = horaSnap.val();
                console.log(this.horaCierre)
                if(hora >= this.horaCierre) {
                  let alert = this.alertCtrl.create({
                    title: 'Muy tarde!',
                    subTitle: 'Debes hacer tu pedido antes de las '+this.horaCierre,
                    buttons: ['OK']
                  });
                  alert.present();
                  return false;
                } else if(data == 'membresia') {
                   if(userProfileSnapshot.val().almuerzos <  this.cuantosPide ) {
                     this.membresiaInsuficiente();
                   } else if(userProfileSnapshot.val().almuerzos >=  this.cuantosPide) {
                      this.profileProvider.updateCantidad(-this.cuantosPide);
                      this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
                        userProfileSnapshot2.forEach(snap => {
                          //console.log(snap.val().idUser)
                          idUser=snap.val().idUser,
                          nombreUser=snap.val().nombreUser,
                          nombrePlato=snap.val().nombrePlato,
                          celular=snap.val().celular,
                          //direccion=snap.val().direccion,
                          imagen=snap.val().imagen,
                          nota=snap.val().nota,
                          estado=snap.val().estado,
                          //zona=snap.val().zona,
                          opcion=snap.val().opcion,
                          pago='con Membresía',
                          precio=snap.val().precio,
                          cantidad=snap.val().cantidad,
                          //this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, 0, zona, direccion)
                          //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, 0);
                          this.profileProvider.getUserProfile().child('carrito').remove()
                          return false;
                        });
                      });
                      this.pedidoHecho();
                   }
                 } else if(data == 'efectivo') {
                   this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
                     userProfileSnapshot2.forEach(snap => {
                       //console.log(snap.val().idUser)
                       idUser=snap.val().idUser,
                       nombreUser=snap.val().nombreUser,
                       nombrePlato=snap.val().nombrePlato,
                       celular=snap.val().celular,
                       //direccion=snap.val().direccion,
                       imagen=snap.val().imagen,
                       nota=snap.val().nota,
                       estado=snap.val().estado,
                       //zona=snap.val().zona,
                       opcion=snap.val().opcion,
                       pago='con Efectivo',
                       precio=snap.val().precio
                      // this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio, zona, direccion)
                       //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio)
                       this.profileProvider.getUserProfile().child('carrito').remove()
                       return false;
                     });
                   });
                   this.pedidoHecho();
                   return false;
                 } else if(data == 'fiado') {
                   // this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
                   //   userProfileSnapshot2.forEach(snap => {
                   //     //console.log(snap.val().idUser)
                   //     idUser=snap.val().idUser,
                   //     nombreUser=snap.val().nombreUser,
                   //     nombrePlato=snap.val().nombrePlato,
                   //     celular=snap.val().celular,
                   //     direccion=snap.val().direccion,
                   //     imagen=snap.val().imagen,
                   //     nota=snap.val().nota,
                   //     estado=snap.val().estado,
                   //     zona=snap.val().zona,
                   //     opcion=snap.val().opcion,
                   //     pago='es Fiado',
                   //     //this.fiadosProvider.createFiado(idUser, nombreUser, nombrePlato, celular, direccion, imagen, nota, estado, zona, opcion, pago)
                   //     //this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, direccion, imagen, nota, estado, zona, opcion, pago)
                   //     return false;
                   //   });
                   // });
                   // this.pedidoHecho();
                   // return false;
                 }
                 console.log('jedionda')
              });
            })
          }
        }
      ]
    });
    confirm.present();
  }

  selecDir(){
    // var nombrePlato, imagen, precio, idUser, nombreUser, celular,  ;
    // this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
    //   userProfileSnapshot2.forEach(snap => {
    //     //console.log(snap.val().idUser)
    //     idUser=snap.val().idUser,
    //     nombreUser=snap.val().nombreUser,
    //     nombrePlato=snap.val().nombrePlato,
    //     celular=snap.val().celular,
    //     //direccion=snap.val().direccion,
    //     imagen=snap.val().imagen,
    //     //nota=snap.val().nota,
    //     //estado=snap.val().estado,
    //     //zona=snap.val().zona,
    //     //opcion=snap.val().opcion,
    //     //pago='con Efectivo',
    //     precio=snap.val().precio
    //     //this.pedidosProvider.createPedido(nombrePlato, imagen, precio)
    //     // this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
    //     //console.log(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
    //     //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio)
    //     //this.profileProvider.getUserProfile().child('carrito').remove()
    //     return false;
    //   });
    // });
    //this.profileProvider.getUserProfile().child('direcciones').on('value', eventListSnapshot => {
    //   eventListSnapshot.forEach(snap => {
    //     //console.log(snap.val().direccion)
    //     return false;
    //   });
     this.listoCompra();
    // });
  }

  listoCompra() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecciona una dirección');
    this.profileProvider.getUserProfile().child('direcciones').once('value', eventListSnapshot => {
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
      text: 'OK',
      handler: data => {
        //console.log(data)
        var idUser, nombreUser, nombrePlato, celular, imagen, estado, pago, precio, cantidad;

        this.profileProvider.getUserProfile().child('direcciones').child(data).on('value', eventListSnapshot => {
          // console.log(eventListSnapshot.val().detalleDireccion)
          // console.log(eventListSnapshot.val().direccion)
          // console.log(eventListSnapshot.val().zona)
          //var zona = eventListSnapshot.val().zona;
          var direccion = eventListSnapshot.val().direccion + ' ' + eventListSnapshot.val().detalleDireccion;
          //this.comoPagar(direccion);
          this.profileProvider.getUserProfile().child('carrito').once('value', userProfileSnapshot2 => {
            userProfileSnapshot2.forEach(snap => {
              //console.log(snap.val().idUser)
              idUser=snap.val().idUser,
              nombreUser=snap.val().nombreUser,
              nombrePlato=snap.val().nombrePlato,
              celular=snap.val().celular,
              //direccion=snap.val().direccion,
              imagen=snap.val().imagen,
              //nota=snap.val().nota,
              //estado=snap.val().estado,
              //zona=snap.val().zona,
              //opcion=snap.val().opcion,
              pago='con Efectivo',
              precio=snap.val().precio,
              cantidad=snap.val().cantidad,
              //this.pedidosProvider.createPedido(nombrePlato, imagen, precio)
              this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, direccion, cantidad)
              // this.pedidosProvider.createPedido(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
              //console.log(idUser, nombreUser, nombrePlato, celular, imagen, pago, precio, zona, direccion)
              //this.selecDir(idUser, nombreUser, nombrePlato, celular, imagen, nota, estado, opcion, pago, precio)
              this.profileProvider.getUserProfile().child('carrito').remove()
              return false;
            });
          });
          this.pedidoHecho();
          return false;
        })
        //this.pedidosProvider.updateDomiciliario(data,key);
      }
    });
    alert.present();
  }

  presentActionSheet(evento) {
    //console.log(evento)
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Elemento del carrito',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Quitar',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.preguntaBorrar(evento.idPedido);
            //this.pedidosProvider.getPedidosDetail(evento.key).remove();
            //this.navCtrl.push('EventCreatePage', { eventId : });
          }
        },
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

  preguntaBorrar(id) {
    let confirm = this.alertCtrl.create({
      title: '¿Quitar del carrito?',
      message: '¿Deseas quitar este item del carrito?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.profileProvider.getUserProfile().child('carrito').child(id).remove();
            // try {
            //   this.navCtrl.pop();
            // } catch(error){
            //  this.navCtrl.setRoot(TiendaPage)
            // }
          }
        }
      ]
    });
    confirm.present();
  }

  pedidoHecho() {
  //  try {
  //    this.navCtrl.pop();
  //  } catch(error){
//    }

    this.profileProvider.getUserProfile().child('carrito').remove();
    let alert = this.alertCtrl.create({
      title: 'Pedido Exitoso',
      subTitle: 'Tu pedido llegará en breve',
      buttons: ['OK']
    });
    alert.present();
    //this.navCtrl.push(TiendaPage)
    this.navCtrl.setRoot(HomePage)
  }

  carritoVacio() {
    let alert = this.alertCtrl.create({
      title: 'Carrito vacío',
      subTitle: 'El carrito está vacío',
      buttons: ['OK']
    });
    alert.present();
  }

  membresiaInsuficiente() {
    let alert = this.alertCtrl.create({
      title: 'Oops...!',
      subTitle: 'No tienes suficientes almuerzos en tu membresía para esta opción',
      buttons: ['OK']
    });
    alert.present();
  }

}
