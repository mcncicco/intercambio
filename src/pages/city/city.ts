import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityProvider } from '../../providers/city/city';
import { ChatPage } from '../chat/chat';

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
  public nomeCidade;
  public siglaCountry;
  public minutes;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private cityProvider: CityProvider
  ) {
      this.nomeCidade = navParams.get('nomeCidade');
      console.log(this.nomeCidade);
      
      this.getCity();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }
  ionViewDidEnter() {
    var minutes = new Date().getMinutes();
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      console.log("Minutos"+this.minutes);
  }
  

  getCity() {
    
    this.cityProvider.getCity(this.nomeCidade.toUpperCase()).subscribe(
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

  joinChat(roomKey:string){
    console.log("joinChat");
    this.navCtrl.push(ChatPage, {roomKey});
  }

}