import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { UserProvider } from '../user/userProvider';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    email: "",
    displayName: "",
    photoUrl: ""
  }
 
  constructor() { }

  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  setConfigData(showSlide?:boolean, user?:User){
    let config  = {
      showSlide: false,
      email: "",
      displayName: "",
      photoUrl: ""
    };
    let configLocal = this.getConfigData();

    if(showSlide){
      config.showSlide = showSlide;
    }
    if(user.email){
      config.email = user.email;
    }

    if(user.displayName){
      config.displayName = user.displayName;
    }else{
      config.displayName = JSON.parse(configLocal).displayName;
    }

    if(user.photoUrl){
      console.log("IFFFFF");
      config.photoUrl = user.photoUrl;
    }else{
      console.log("ELSE");
      config.photoUrl = JSON.parse(configLocal).photoUrl;
    }
    
    console.log("Setando config"+config);

    localStorage.setItem(config_key_name, JSON.stringify(config));
    

  }
  
}
