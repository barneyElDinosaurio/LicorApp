import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Alert,
  AlertController,
  NavParams } from 'ionic-angular';
import { ContadoresProvider } from '../../providers/contadores/contadores';

/**
 * Generated class for the UbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {

public mapa: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     //public authProvider: AuthProvider,
     //public profileProvider: ProfileProvider,
     public contadoresProvider: ContadoresProvider
   ) { }

  dd() {
    this.contadoresProvider.getContadoresNodo('mapa').on('value', snape=>{
    	//this.mapa = snape.val().title;
    	///console.log(this.mapa)
    	//var div = document.getElementById( 'ixi' );
    	//div.insertAdjacentHTML( 'beforeend', this.mapa );
    });  
  }

  ionViewDidLoad() {
    this.contadoresProvider.getContadoresNodo('mapa').once('value', snape=>{
    	this.mapa = snape.val().title;
    	console.log(this.mapa)
    	var div = document.getElementById( 'ixi' );
    	div.insertAdjacentHTML( 'beforeend', this.mapa );
    });  	
  }

}
