import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {

  public nomecidade;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.nomecidade = navParams.get('nomeCidade');
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }

}