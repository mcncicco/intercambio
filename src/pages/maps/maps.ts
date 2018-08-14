import {Component, ElementRef, ViewChild} from '@angular/core';
import {Platform, NavController} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import { ConfigProvider } from '../../providers/auth-service/config';
import { MapsProvider } from '../../providers/maps/maps';
import { Localizacao } from '../../providers/maps/localizacao';
import { CityProvider } from '../../providers/city/city';
import { CityPage } from '../city/city';
import { PersonPage } from '../person/person';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {

  localizacao: Localizacao;
  latSum: any;
  lngSum: any;
  countLocations: any;

  @ViewChild('map')
  private mapElement:ElementRef;
  private map:GoogleMap;
  private location:LatLng;
  private locations:Array<any> = [];

  constructor(private platform:Platform,
              private googleMaps:GoogleMaps,
              public geolocation: Geolocation,
              public configProvider: ConfigProvider,
              public mapsProvider: MapsProvider,
              public cityProvider: CityProvider,
              public navCtrl: NavController
            ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
    
    this.getPosition();
    this.setMarkers();
    this.getMap();
    
  }

  getMap(){
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        
        this.location = new LatLng((this.latSum/this.countLocations), (this.lngSum/this.countLocations));
        let options = {
          target: this.location,
          zoom: 3
        };

        this.map.moveCamera(options);
        setTimeout(() => {this.addCluster()}, 1000);
        setTimeout(() => {this.setCities()}, 1000);
        
      });
    });
  }

  addCity() {
    console.log(this.map);
    this.map.addMarker({
      title: 'My Marker',
      icon: 'place',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    }).then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          let nomeCidade = "asdf";
          this.navCtrl.push(CityPage, {nomeCidade} );
        });
    });
  }

  addCluster() {
    this.map.addMarkerCluster({
      markers: this.locations,
      icon: 'person_pin',
      icons: [
        {min: 2, max: 100, url: "./assets/icon/blue-dot.png", anchor: {x: 16, y: 16}}
      ]
    })
    .then((markerCluster) => {
      markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((cluster: any) => {
        let nomeCidade = "asdf";
        this.navCtrl.push(PersonPage, {nomeCidade} );
      });
    });
  }
  getPosition() {
    console.log("getPosition");

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.locations.push({position: {lat: resp.coords.latitude, lng: resp.coords.longitude}});
        
      }).catch((error) => {
        console.log(error);
      });
  }
  savePosition(latitude: number, longitude: number) {
    console.log("save");
    let config = this.configProvider.getConfigData();
    console.log(config);
    this.localizacao = new Localizacao();
    this.localizacao.email = JSON.parse(config).email;
    this.localizacao.latitude = latitude;
    this.localizacao.longitude = longitude;
    this.mapsProvider.save(this.localizacao);

  }

  setMarkers() {
    console.log("setMarkers");
    this.latSum = 0;
    this.lngSum = 0;
    this.countLocations = 0;
    this.mapsProvider.getAll().subscribe(items => {
      items.forEach(item => {
        //console.log("setMarkers" + item.email + " " + item.latitude + " " + item.longitude);
        
        this.locations.push({position: {lat: item.latitude, lng: item.longitude}});
        
        this.latSum = this.latSum + item.latitude;
        this.lngSum = this.lngSum + item.longitude;
        this.countLocations = this.countLocations + 1;

      });
      
    });
    
  }
  setCities() {
    console.log("setCities");

    this.cityProvider.getAllCities().subscribe(items => {
      items.forEach(item => {
        this.location = new LatLng(item.latitude, item.longitude);
       this.addCity();
        


      });
    });


  }
}
