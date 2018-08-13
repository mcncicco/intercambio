import {Component, ElementRef, ViewChild} from '@angular/core';
import {Platform} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from "@ionic-native/google-maps";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  private mapElement:ElementRef;
  private map:GoogleMap;
  private location:LatLng;
  private locations:Array<any> = [];

  constructor(private platform:Platform,
              private googleMaps:GoogleMaps) {
    this.location = new LatLng(42.346903, -71.135101);


    //Add cluster locations
    this.locations.push({position: {lat: 42.346903, lng: -71.135101}});
    this.locations.push({position: {lat: 42.342525, lng: -71.145943}});
    this.locations.push({position: {lat: 42.345792, lng: -71.138167}});
    this.locations.push({position: {lat: 42.320684, lng: -71.182951}});
    this.locations.push({position: {lat: 42.359076, lng: -71.0645484}});
    this.locations.push({position: {lat: 42.36, lng: -71.1}});
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 8
        };

        this.map.moveCamera(options);
        //setTimeout(() => {this.addMarker()}, 2000);
        setTimeout(() => {this.addCluster()}, 500);
      });
    });
  }

  addMarker() {
    this.map.addMarker({
      title: 'My Marker',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('Marker Clicked');
      });
    });
  }

  addCluster() {
    this.map.addMarkerCluster({
      markers: this.locations,
      icons: [
        {min: 2, max: 100, url: "./assets/icon/blue-dot.png", anchor: {x: 16, y: 16}}
      ]
    })
    .then((markerCluster) => {
      markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((cluster: any) => {
        console.log('click 2');
        alert('cluster was clicked.');
      });
    });
  }
}
