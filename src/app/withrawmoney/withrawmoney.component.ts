import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-withrawmoney',
  templateUrl: './withrawmoney.component.html',
  styleUrls: ['./withrawmoney.component.scss'],
})
export class WithrawmoneyComponent implements OnInit {
  amount
  balance
  constructor(public modalCtrl: ModalController, private balanceSerive: BalanceService,public toastController: ToastController) { }

  ngOnInit() {


  }
  add() {
    var check = this.balanceSerive.withraw(this.amount)
    if(check){
      this.presentToast("Dinero retirado con exito")

      this.modalCtrl.dismiss({
        'amount': this.amount
      });
    }
    else{
      this.presentToast("Error: El monto ingresado es mayor al dinero en cuenta")
    }

   
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',  
    });
    toast.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
