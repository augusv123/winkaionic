import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-addbalancemodal',
  templateUrl: './addbalancemodal.component.html',
  styleUrls: ['./addbalancemodal.component.scss'],
})
export class AddbalancemodalComponent implements OnInit {
  amount
  constructor(public modalCtrl: ModalController, private balanceSerive: BalanceService) { }

  ngOnInit() {}
  add() {
    this.balanceSerive.addBalance(this.amount)

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
