import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    email: "",
    displayName: "",
    photoURL: ""    
  }

  constructor() { }

  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  setConfigData(showSlide?:boolean, email?:string, displayName?:string, photoURL?:string){
    let config  = {
      showSlide: false,
      email: "",
      displayName: "",
      photoURL: ""
    };

    if(showSlide){
      config.showSlide = showSlide;
      
    }
    if(email){
      config.email = email;
    }
    if(displayName){
      config.displayName = displayName;
    }
    if(photoURL){
      config.photoURL = photoURL.replace("/","_b_");
    }
    console.log("Setando config"+config);

    localStorage.setItem(config_key_name, JSON.stringify(config));

  }
  
}
