import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Movement } from '../models/Movement';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
   
  ) {
   
    }
    get userUID(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.uid;
    }
    getBalance() {
      var uid = this.userUID
      var currentballance = 0

      var userRef =  firebase.database().ref(`users/${uid}`)
      var conditionbalance = userRef.child("balance")
      conditionbalance.on("value", function(snapshot) {

       currentballance = snapshot.val()
     }, function (errorObject) {
       console.log("The read failed: " + errorObject.code);
     });
     console.log(currentballance)
     return currentballance
    }
    addBalance(amount){
      var uid = this.userUID
      var userRef =  firebase.database().ref(`users/${uid}`)
      var currentballance = 0
      // userRef.child("balance").update(amount)

       var conditionbalance = userRef.child("balance")
       conditionbalance.on("value", function(snapshot) {

        currentballance = snapshot.val()
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      userRef.child("balance").set(amount + currentballance)
      var movement = new Movement("Ingreso de dinero",amount)
      userRef.child("movements").push(movement)



    }
    withraw(amount){
      var uid = this.userUID
      var userRef =  firebase.database().ref(`users/${uid}`)
      var currentballance = 0
      // userRef.child("balance").update(amount)
      var success = false
       var conditionbalance = userRef.child("balance")
       conditionbalance.on("value", function(snapshot) {

        currentballance = snapshot.val()
        
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      if(amount > currentballance) return success
      else{
        userRef.child("balance").set(currentballance - amount )
        var movement = new Movement("Retiro de dinero",amount)
        userRef.child("movements").push(movement)
        success = true
      }
      
      return success


    }
  }