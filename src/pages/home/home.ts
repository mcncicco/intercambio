import { Component, NgZone } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { CityProvider } from '../../providers/city/city';
import { CityPage } from '../city/city';
import { MapsProvider } from '../../providers/maps/maps';
import { MapsPage } from '../maps/maps';
import { TabsPage } from '../tabs/tabs';
import { ChatPage } from '../chat/chat';
import { User } from '../../providers/user/user';
import { ConfigProvider } from '../../providers/auth-service/config';
import { AddRoomPage } from '../add-room/add-room';
import { CountryPage } from '../country/country';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  user: User = new User();
  
  public refresher;
  public isRefreshing: boolean = false;

  public listCities = new Array<any>();
  public listCountries = new Array<any>();

  constructor(public navCtrl: NavController,
    private afAhth: AngularFireAuth,
    private cityProvider: CityProvider,
    private mapsProvider: MapsProvider,
    private configProvider: ConfigProvider

  ) {
    let config = configProvider.getConfigData();
    console.log("HOME"+config);
    this.user.displayName = JSON.parse(config).displayName;
    this.user.photoUrl = JSON.parse(config).photoUrl;
    this.user.email = JSON.parse(config).email;
    console.log("HOME"+this.user);
   
  }
  joinChat(key:string){
    console.log("joinChat");
    let roomname = key; 
    this.navCtrl.push(ChatPage, {key, roomname});
  }

  verNoMapa(nomeCidade:string) {
    this.navCtrl.push(MapsPage, {nomeCidade});
  }

  openDetails(siglaCountry: string, nomeCountry: string) {
    console.log('home' + nomeCountry);
    console.log('home' + siglaCountry);
    this.navCtrl.push(CountryPage, {siglaCountry, nomeCountry});
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

  getCountries() {

    this.cityProvider.getAllCountries().subscribe(
      data => {
        console.log(data);
        this.listCountries = data;
        /*const response = (data as any);
        console.log(response);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
        this.listCities = objeto_retorno;*/
      });
//this.cotacaoProvider.saveCotacao();

  }

 

  doRefresh(refresher) {
    this.isRefreshing = refresher;
    this.isRefreshing = true;
    console.log('Begin async operation', refresher);


    if (this.isRefreshing) {
      refresher.complete();
      this.isRefreshing = false;
    }

  }

  ionViewDidEnter() {
    this.getCities();
    this.getCountries();
    this.getAllCities();

    console.log("HomePage");
  }

  getAllCities() {

    

    this.cityProvider.getAllCities().subscribe(items => {

      items.forEach(item => {


        console.log(item);

        console.log(item.$key);

        this.cityProvider.getAllCitiesByCountry(item.$key + "/").subscribe(cidades => {
          cidades.forEach(c => {

            let data = firebase.database().ref('user/'+this.user.email.replace("@", "_a_").replace(".", "_p_")+'/cities/'+c.nome);

            data.set({
              nome:c.nome,
              checked:true,
              pais:c.pais,
              sendDate:Date()
            });

    
      
            
          });
        });



      });
    });
    


  }


  public horaRecife = null;
  getHour(nomeCidade: string) {
    console.log("GETHOUR");
    //console.log(this.horaRecife); 
    if (this.horaRecife == null) {
      /*console.log("if");
      this.cityProvider.getHour().subscribe(
        data => {
          console.log(data);
          const response = (data as any);
          console.log(response.formatted.string);
          console.log(JSON.stringify(response));
          console.log(JSON.stringify(response.formatted).split(" ")[1]);
          this.horaRecife = JSON.stringify(response.formatted).split(" ")[1];
          
        }, error => {
          console.log(error);
        }
      )*/

    }
    return this.horaRecife;
  }


}