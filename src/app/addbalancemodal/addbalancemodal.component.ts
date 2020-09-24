import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-addbalancemodal',
  templateUrl: './addbalancemodal.component.html',
  styleUrls: ['./addbalancemodal.component.scss'],
})
export class AddbalancemodalComponent implements OnInit {
  amount
  balance
  constructor(public modalCtrl: ModalController, private balanceSerive: BalanceService,private toastController : ToastController) { }

  ngOnInit() {


  }
  add() {
    this.balanceSerive.addBalance(this.amount)
    
    this.presentToast("Dinero ingresado con exito")
    this.modalCtrl.dismiss({
      'amount': this.amount
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',  
    });
    toast.present();
  }

}
