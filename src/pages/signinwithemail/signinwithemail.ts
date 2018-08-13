import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
import { User } from '../../providers/user/user';
import { ConfigProvider } from '../../providers/auth-service/config';



@IonicPage()
@Component({
  selector: 'page-signin-with-email',
  templateUrl: 'signinwithemail.html',
})
export class SigninWithEmailPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  public loader;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private configProvider: ConfigProvider) {
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SigninWithEmailPage');    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninWithEmailPage');
  }

  signIn() {
    
    this.presentLoading();
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.configProvider.setConfigData(false,this.user.email,this.user.displayName);
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
    this.closeLoading();
    
  }
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }
  closeLoading(){
    this.loader.dismiss();
  }
}