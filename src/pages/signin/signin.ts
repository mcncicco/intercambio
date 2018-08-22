import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../providers/user/user';
import { ConfigProvider } from '../../providers/auth-service/config';
import { Facebook } from '@ionic-native/facebook';




@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  user: User = new User();
  
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
  private configProvider: ConfigProvider,
  private facebook: Facebook) {
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  signIn(){
    if(this.form.form.valid){
      this.authService.signIn(this.user)
      .then(() => {
        this.navCtrl.setRoot(SignupPage);
      })
      .catch((error:any) => {
        let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
        if(error.code == 'auth/invalid-email'){
          toast.setMessage('auth/invalid-email');
        } else if(error.code == 'auth/user-disable'){
          toast.setMessage('auth/user-disable');
        } else if(error.code == 'auth/invalid-not-found'){
          toast.setMessage('auth/invalid-not-found');
        } else if(error.code == 'auth/wrong-password'){
          toast.setMessage('auth/wrong-password');
        }
        toast.present();
      })
    }
  }

  /*signInWithEmailPage() {
    this.navCtrl.push(SigninWithEmailPage);
  }*/

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.saveLocal();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch((error) => {
        console.log(error);
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }
  
  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then( () => {
        console.log("SINGNINFACEBOOK: verifica login");
        
        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [])
        .then(profile => {
          this.user.email = profile['email'];
          this.user.displayName =  profile['name'];
          this.user.photoUrl = profile['picture_large']['data']['url'];
          this.saveLocal();
          this.navCtrl.setRoot(TabsPage);  
        });
        
      })
      .catch((error) => {
        console.log(error);
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }
/*
  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  saveLocal(){
    this.configProvider.setConfigData(false,this.user.email,this.user.displayName, this.user.photoUrl);
  }

}