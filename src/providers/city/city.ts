import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class CityProvider {

  private PATH_CITIES = 'cidades/';

  
  constructor(public http: HttpClient,
    private db: AngularFireDatabase) {
    console.log('Hello CityProvider Provider');
  }
  

  getHour(){
    return this.http.get("http://api.timezonedb.com/v2/get-time-zone?key=SHESX7OLF3F3&format=json&by=zone&zone=America/Recife");
     
  }
  getAllCities() {
    console.log("GETALLCITIES"); 
   return this.db.list(this.PATH_CITIES);
  }
  getCity(key: string) {
    return this.db.object(this.PATH_CITIES + key);
  }

}
