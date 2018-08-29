import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  signOut() {
    this.authServiceProvider.signOut().then(() => {
      this.app.getRootNav().setRoot(SigninPage);

    })
      .catch((error) => {
        console.error(error);
        this.navCtrl.setRoot(SigninPage);
      });
    this.navCtrl.setRoot(SigninPage);
  }

}
