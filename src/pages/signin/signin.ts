import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../providers/user/user';
import { ConfigProvider } from '../../providers/auth-service/config';
import { Facebook } from '@ionic-native/facebook';
import { UserProvider } from '../../providers/user/userProvider';




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
    private facebook: Facebook,
    private userProvider: UserProvider) {
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

  signInWithEmailPage() {
    //this.navCtrl.push(SigninWithEmailPage);
  }

  signInWithGoogle() {
    console.log("SINGNINGOOGLE: verifica login");
    console.log(this.authService.signInWithGoogle()
      .then((res) => {
        
        this.user.email = res.email;
        this.user.displayName = res.displayName;
        this.user.photoUrl = res.imageUrl;
        this.userProvider.save(this.user);
        this.saveLocal();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch((error) => {
        console.log(error);
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      }));
  }
  
  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then( () => {
        console.log("SINGNINFACEBOOK: verifica login");


        this.facebook.login(['public_profile', 'email', 'user_birthday','user_hometown','user_location'])
    .then( (res) => {
      var fb_id = res.authResponse.userID;
      var fb_token = res.authResponse.accessToken;
      
      this.facebook.api("/me?fields=name,birthday,email,hometown,location,picture.width(100).height(100).as(picture_large)", []).then((profile) => {

        this.user.email = profile.email;
        this.user.displayName = profile.name;
        this.user.photoUrl = profile['picture_large']['data']['url'];
        console.log("SIGNIN"+this.user);
        this.userProvider.save(this.user);
        this.saveLocal();
        
        this.navCtrl.setRoot(TabsPage);  

        // => Open user session and redirect to the next page

    });

    })
    .catch((error) => {
      console.log(error);
      this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
        .present();
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
    this.configProvider.setConfigData(false,this.user);
  }

}