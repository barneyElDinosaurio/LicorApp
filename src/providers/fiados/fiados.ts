import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

/*
  Generated class for the FiadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FiadosProvider {

  public catsListRef: Reference;
  public fiadosListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.catsListRef = firebase
          .database()
          .ref(`/categorias`);
      }
    });
  }

  getFiadosList(): Reference {
    return this.fiadosListRef;
  }

  getFiadosDetail(eventId: string): Reference {
    return this.fiadosListRef.child(eventId);
  }

  createFiado(
    idUser: string,
    nombreUser: string,
    nombrePlato: string,
    celular: number,
    direccion: string,
    imagen: string,
    nota: string,
    estado: string,
    zona: string,
    opcion: string,
    pago: string,
  ) : PromiseLike<any> {
    return this.fiadosListRef.push({
      idUser:      idUser,
      nombreUser:  nombreUser,
      nombrePlato: nombrePlato,
      celular:     celular,
      direccion:   direccion,
      imagen:      imagen,
      nota:        nota,
      estado:      estado,
      zona:        zona,
      opcion:      opcion,
      pago:        pago,
    })
  }

  getCatsList(): Reference {
    return this.catsListRef;
  }

  getCatsDetail(eventId: string): Reference {
    return this.catsListRef.child(eventId);
  }

 crearCategoria(input:string): PromiseLike<any> {
   return this.catsListRef.push({nombre:input})
 }

 crearSubCategoria(key:string, subcategorias:string): PromiseLike<any> {
   return this.catsListRef.child(key).child('subcategorias').push(subcategorias)
 }

}
