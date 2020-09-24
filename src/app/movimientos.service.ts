import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Movement } from './models/Movement';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  finalItems;
  public data: Array<any> =[];
  public myData: any[] =[];
  constructor() {

  }

  getMovements(){
    var uid = this.userUID
      console.log(uid)
      var movements:Movement[] = []
     var movimientoref = firebase.database().ref(`users/${uid}`).child("movements");
     movimientoref.on('value', function(snapshot) {
      let tempmovements = snapshot.val();
      Object.keys(tempmovements).forEach(key => {
        console.log(tempmovements[key].amount)
        movements.push(new Movement(tempmovements[key].type,tempmovements[key].amount)) ;
      });
});

return movements
   }
   get userUID(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }
}