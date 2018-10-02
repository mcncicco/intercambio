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



  getCotacaoCAN() {
    this.cityProvider.getCotacao("CAD-BRL").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        console.log(response);
        this.cotacao = JSON.stringify(response[0].ask.replace("\"", ""));
        console.log(this.cotacao);
        this.mapsProvider.saveCotacao("CAN", this.cotacao.replace("\"", ""));
      }, error => {
        console.log(error);
      }
    )
  }
  getCotacaoENG() {
    this.cityProvider.getCotacao("GBP-BRL").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        console.log(response);
        this.cotacao = JSON.stringify(response[0].ask.replace("\"", ""));
        console.log(this.cotacao);
        this.mapsProvider.saveCotacao("ENG", this.cotacao.replace("\"", ""));
      }, error => {
        console.log(error);
      }
    )
  }
  getCotacaoEUA() {
    this.cityProvider.getCotacao("USD-BRL").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        console.log(response);
        this.cotacao = JSON.stringify(response[0].ask.replace("\"", ""));
        console.log(this.cotacao);
        this.mapsProvider.saveCotacao("EUA", this.cotacao.replace("\"", ""));
      }, error => {
        console.log(error);
      }
    )
  }
  getCotacaoIRL() {
    this.cityProvider.getCotacao("EUR-BRL").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        console.log(response);
        this.cotacao = JSON.stringify(response[0].ask.replace("\"", ""));
        console.log(this.cotacao);
        this.mapsProvider.saveCotacao("IRL", this.cotacao.replace("\"", ""));
      }, error => {
        console.log(error);
      }
    )
  }
  getCotacaoMAL() {
    this.cityProvider.getCotacao("EUR-BRL").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        console.log(response);
        this.cotacao = JSON.stringify(response[0].ask).replace("\"", "");
        console.log(this.cotacao);
        this.mapsProvider.saveCotacao("MAL", this.cotacao.replace("\"", ""));
      }, error => {
        console.log(error);
      }
    )
  }

  public hora;
  getHourBarcelona() {
    this.cityProvider.getHour("Europe/London").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("ESP/barcelona", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  
  getHourMadri() {
    this.cityProvider.getHour("Europe/London").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("ESP/Barcelona", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourBoston() {
    this.cityProvider.getHour("America/New_York").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("EUA/Boston", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  
  getHourSydney() {
    this.cityProvider.getHour("Australia/Sydney").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("AUS/Sydney", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourValeta() {

    this.cityProvider.getHour("Europe/Malta").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("MAL/Valeta", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourDublin() {

    this.cityProvider.getHour("Europe/Dublin").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("IRL/Dublin", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourSanDiego(){
    this.cityProvider.getHour("America/Los_Angeles").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("EUA/SanDiego", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourSaoFrancisco() {

    this.cityProvider.getHour("America/Los_Angeles").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("EUA/SaoFrancisco", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourNewYork() {

    this.cityProvider.getHour("America/New_York").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("EUA/NewYork", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourLondres() {

    this.cityProvider.getHour("Europe/London").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("ENG/Londres", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourToronto() {

    this.cityProvider.getHour("America/Toronto").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("CAN/Toronto", this.hora);
      }, error => {
        console.log(error);
      }
    )
  }
  getHourVancouver() {

    this.cityProvider.getHour("America/Vancouver").subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.hora = JSON.stringify(response.formatted).split(" ")[1].replace("\"", "");
        this.mapsProvider.saveHour("CAN/Vancouver", this.hora);
      }, error => {
        console.log(error);
      }
    )
    var minutos = new Date().getMinutes();
    if (minutos < 10) {
      console.log("0" + minutos);
    } else {
      console.log(minutos);
    }

  }



}
