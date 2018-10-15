import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class CityProvider {

  private PATH_CITIES = 'cidades/';
  private PATH_COUNTRIES = 'paises/';

  
  constructor(public http: HttpClient,
    private db: AngularFireDatabase) {
    console.log('Hello CityProvider Provider');
  }
  

  getHour(zone:string){
    return this.http.get("http://api.timezonedb.com/v2/get-time-zone?key=SHESX7OLF3F3&format=json&by=zone&zone="+zone);
     
  }
  getCotacao(zone:string){
    return this.http.get("http://economia.awesomeapi.com.br/"+zone+"/1?format=json");

  }

  getAllCities() {
    console.log("GETALLCITIES"); 
   return this.db.list(this.PATH_CITIES);
  }
  getAllCitiesByCountry(countryKey: string) {
    console.log("countryKey"); 
    console.log(this.PATH_CITIES + countryKey);
   return this.db.list(this.PATH_CITIES+countryKey);
  }

  getCity(key: string) {
    console.log(this.PATH_CITIES + key);
    return this.db.object(this.PATH_CITIES + key);
  }
  getCities(key: string) {
    return this.db.list(this.PATH_CITIES + key);
  }
  getAllCountries() {
    console.log("GETALLCITIES"); 
   return this.db.list(this.PATH_COUNTRIES);
  }
  
  getCountry(key: string) {
    return this.db.object(this.PATH_COUNTRIES + key);
  }

  getCityTemp(code:string){
    return this.http.get("http://apiadvisor.climatempo.com.br/api/v1/weather/locale/"+code+"/current?token=070bef5d782703caaf643ddec6c38f43");
  }
  getCityCode(city:string){
    return this.http.get("http://apiadvisor.climatempo.com.br/api/v1/locale/city?name="+city+"&token=070bef5d782703caaf643ddec6c38f43");
  }

}
