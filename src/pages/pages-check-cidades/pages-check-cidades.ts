import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/auth-service/config';

import * as firebase from 'firebase';
import { CityProvider } from '../../providers/city/city';

@IonicPage()
@Component({
  selector: 'page-pages-check-cidades',
  templateUrl: 'pages-check-cidades.html',
})



export class PagesCheckCidadesPage implements OnInit {

  displayName:string;
  userEmail:string;

  public listCities = new Array<any>();
  
  ref = firebase.database().ref('chatrooms/');

  ngOnInit() {
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private configProvider: ConfigProvider, private cityProvider: CityProvider,) {
    let config = configProvider.getConfigData();

    this.userEmail = JSON.parse(config).email;
    this.displayName = JSON.parse(config).displayName;

    this.userEmail = JSON.parse(config).email.replace("@", "_a_").replace(".", "_p_");
    //this.displayName = JSON.parse(config).displayName.replace("@", "_a_").replace(".", "_p_");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesCheckCidadesPagee');
  }

  
  getCities() {

    

    this.cityProvider.getAllCitiesByUser(this.userEmail).subscribe(items => {

      items.forEach(item => {


        console.log(item);

        console.log(item.$key);

        this.listCities.push(item);

      });
    });
    


  }

   
  ionViewDidEnter() {
    this.getCities();

  }
  


  form = [
    {name:'Toronto', selected: true},
    {name:'Dublin', selected: false}, 
    {name:'Londres', selected: false}
  ];

  selectCity(entry){
    console.log("1");
    console.log(entry);
    console.log(entry.nome);
    console.log('user/'+this.userEmail+'/cities/'+entry.nome);

    let data = firebase.database().ref('user/'+this.userEmail+'/cities/'+entry.nome);

    if(entry.checked == true){
      data.set({
        nome:entry.nome,
        pais:entry.pais,
        checked:true,
        sendDate:Date()
      });
    }else{
      data.set({
        nome:entry.nome,
        pais:entry.pais,
        checked:false,
        sendDate:Date()
      });
    }

    
    

  }

  

}
