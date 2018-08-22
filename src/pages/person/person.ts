import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {

  public emailUsuario;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.emailUsuario = navParams.get('emailUsuario');
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

}
