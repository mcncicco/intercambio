import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../signin/signin';
import { CityProvider } from '../../providers/city/city';
import { MapsProvider } from '../../providers/maps/maps';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public hora;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private app: App,
    private cityProvider: CityProvider,
    public mapsProvider: MapsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter SettingsPage');
    setTimeout(() => { this.getHourDublin() }, 1000);
    setTimeout(() => { this.getHourLondres() }, 2000);
    setTimeout(() => { this.getHourNewYork() }, 3000);
    setTimeout(() => { this.getHourSaoFrancisco() }, 4000);
    setTimeout(() => { this.getHourSydney() }, 5000);
    setTimeout(() => { this.getHourToronto() }, 6000);
    setTimeout(() => { this.getHourValeta() }, 7000);
    setTimeout(() => { this.getHourVancouver() }, 8000);
    setTimeout(() => { this.getHourSanDiego() }, 9000);
    setTimeout(() => { this.getHourMadri() }, 10000);
    setTimeout(() => { this.getHourBarcelona() }, 11000);
    setTimeout(() => { this.getHourBoston() }, 12000);

    setTimeout(() => { this.getCotacaoCAN() }, 9000);
    setTimeout(() => { this.getCotacaoENG() }, 10000);
    setTimeout(() => { this.getCotacaoEUA() }, 11000);
    setTimeout(() => { this.getCotacaoIRL() }, 12000);
    setTimeout(() => { this.getCotacaoMAL() }, 13000);

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

  public cotacao;

  getCotacao(p1:string, p2:string) {
    this.cityProvider.getCotacao(p1).subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        console.log(response);
        this.cotacao = JSON.stringify(response[0].ask.replace("\"", ""));
        console.log(this.cotacao);
        this.mapsProvider.saveCotacao(p2, this.cotacao.replace("\"", ""));
      }, error => {
        console.log(error);
      }
    )
  }

  getCotacaoCAN() {
    this.getCotacao("CAD-BRL", "CAN");
  }
  getCotacaoENG() {
    this.getCotacao("GBP-BRL", "ENG");
  }
  getCotacaoEUA() {
    this.getCotacao("USD-BRL", "EUA");
  }
  getCotacaoIRL() {
    this.getCotacao("EUR-BRL", "IRL");
  }
  getCotacaoMAL() {
    this.getCotacao("EUR-BRL", "MAL");
  }
  
  getHour(p1:string, p2:string) {
    this.cityProvider.getHour(p1).subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour(p2, this.hora);
      }, error => {
        console.log(error);
      }
    );
  }
  getTemp(p1:string, p2:string) {
    this.cityProvider.getCityCode(p1).subscribe(
      data => {
        const response = (data as any);
        console.log("temp "+p1+p2);
        console.log("temp "+response);
        let code = response[0].id;
        console.log(response[0].id);
        console.log("C" + code);
        this.cityProvider.getCityTemp(code).subscribe(
          data => {
            const response = (data as any);
            console.log(response);
            console.log(response.name);
            console.log(response.data.temperature);
            this.mapsProvider.saveTemp(p2, response.data.temperature);

          }, error => {
            console.log(error);
          }
        );
      }, error => {
        console.log(error);
      }
    );
  }
  getHourBarcelona() {
    this.getHour("Europe/London", "ESP/Barcelona");
    this.getTemp("Barcelona", "ESP/Barcelona");
  }
  
  getHourMadri() {
    this.getHour("Europe/London", "ESP/Madri");
    this.getTemp("Madri", "ESP/Madri");
  }

  getHourBoston() {
    this.getHour("America/New_York", "EUA/Boston");
    this.getTemp("Boston", "EUA/Boston");
  }
  
  getHourSydney() {
    this.getHour("Australia/Sydney", "AUS/Sydney");
    this.getTemp("Sydney", "AUS/Sydney");
  }
  getHourValeta() {
    this.getHour("Europe/Malta", "MAL/Valeta");
    this.getTemp("Valeta", "MAL/Valeta");
  }
  getHourDublin() {
    this.getHour("Europe/Dublin", "IRL/Dublin");
    this.getTemp("Dublin", "IRL/Dublin");
  }
  getHourSanDiego(){
    this.getHour("America/Los_Angeles", "EUA/SanDiego");
    this.getTemp("SanDiego", "EUA/SanDiego");
  }
  getHourSaoFrancisco() {
    this.getHour("America/Los_Angeles", "EUA/SaoFrancisco");
    this.getTemp("SaoFrancisco", "EUA/SaoFrancisco");
  }
  getHourNewYork() {
    this.getHour("America/New_York", "EUA/NewYork");
    this.getTemp("NewYork", "EUA/NewYork");
  }
  getHourLondres() {
    this.getHour("Europe/London", "ENG/Londres");
    this.getTemp("Londres", "ENG/Londres");
  }
  getHourToronto() {
    this.getHour("America/Toronto", "CAN/Toronto");
    this.getTemp("Toronto", "CAN/Toronto");
  }
  getHourVancouver() {
    this.getHour("America/Vancouver", "CAN/Vancouver");
    this.getTemp("Vancouver", "CAN/Vancouver");
  }
}