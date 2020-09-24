import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  photoUrl =""
  user
  constructor(private authService: AuthService, public router: Router, public toastController: ToastController) { }
  ngOnInit() {
     this.authService.getUserInfo().subscribe(res => {
      this.user =  res[0]
      this.photoUrl = this.user.photoURL
      this.presentToast("Usuario cargado con exito")
     }
      ,
      error=>  alert("error")

    )
    console.log(this.user)
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  addBalance(){
    alert("working")
  }
}
