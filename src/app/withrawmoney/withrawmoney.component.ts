import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-withrawmoney',
  templateUrl: './withrawmoney.component.html',
  styleUrls: ['./withrawmoney.component.scss'],
})
export class WithrawmoneyComponent implements OnInit {
  amount
  balance
  constructor(public modalCtrl: ModalController, private balanceSerive: BalanceService) { }

  ngOnInit() {


  }
  add() {
    this.balanceSerive.withraw(this.amount)
    

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

}
