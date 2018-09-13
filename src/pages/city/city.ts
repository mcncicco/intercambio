import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityProvider } from '../../providers/city/city';

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

  public listCities = new Array<any>();
  public nomecidade;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private cityProvider: CityProvider,
  ) {
      this.nomecidade = navParams.get('country');
      this.getCities();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }

  getCities() {

    this.cityProvider.getAllCities().subscribe(
      data => {
        console.log(data);
        this.listCities = data;
        /*const response = (data as any);
        console.log(response);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
        this.listCities = objeto_retorno;*/
      });
//this.cotacaoProvider.saveCotacao();

  }

}