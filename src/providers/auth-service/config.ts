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
    photoURL: "",
    locale: "",
    birthday: "",
    hometown: ""
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
      photoURL: "",
      locale: "",
      birthday: "",
      hometown: ""

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
      config.photoURL = user.photoUrl;
    }else{
      config.photoURL = JSON.parse(configLocal).photoURL;
    }
    
    if(user.locale){
      config.locale = user.locale;
    }else{
      config.locale = JSON.parse(configLocal).locale;
    }

    if(user.birthday){
      config.birthday = user.birthday;
    }
    else{
      config.birthday = JSON.parse(configLocal).birthday;
    }

    if(user.hometown){
      config.hometown = user.hometown;
    }else{
      config.hometown = JSON.parse(configLocal).hometown;
    }
    
   
    console.log("Setando config"+config);

    localStorage.setItem(config_key_name, JSON.stringify(config));
    

  }
  
}
