import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddbalancemodalComponent } from 'src/app/addbalancemodal/addbalancemodal.component';
import { MovimientosService } from 'src/app/movimientos.service';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from 'src/app/services/balance.service';
import { WithrawmoneyComponent } from 'src/app/withrawmoney/withrawmoney.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  name
  balance
  user
  confianza= 0
  gananzia= 0
  email
  movements
  constructor(private authService: AuthService, public router: Router,private balanceSerive : BalanceService,public modalController: ModalController, private movimientosService: MovimientosService) { }
  ngOnInit() {
    this.movements = this.movimientosService.getMovements()
    console.log(this.movements)
     this.authService.getUserInfo().subscribe(res => {
      this.user =  res[0]
      console.log(this.user[0])
     }
      ,
      error=>  alert("error")

    )
    console.log(this.user)
   this.balance =  this.balanceSerive.getBalance()
   console.log(this.balance)
  }
  addBalance(){
    this.presentModal()
  }
  async withraw(){
    const modal = await this.modalController.create({
      component: WithrawmoneyComponent,
      cssClass: 'my-custom-class'
    });
     await modal.present();
     const { data } = await modal.onWillDismiss();
     this.balance = this.balanceSerive.getBalance()
     this.movements = this.movimientosService.getMovements()
     console.log(this.movements)


  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddbalancemodalComponent,
      cssClass: 'my-custom-class'
    });
     await modal.present();
     const { data } = await modal.onWillDismiss();
     this.balance = this.balanceSerive.getBalance()
     this.movements = this.movimientosService.getMovements()
     console.log(this.movements)

  }

}
