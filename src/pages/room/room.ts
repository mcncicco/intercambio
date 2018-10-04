import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ChatPage } from '../chat/chat';
import { ConfigProvider } from '../../providers/auth-service/config';



@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  nickname:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private configProvider: ConfigProvider) {
    
    console.log("construtor room");
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
    console.log(this.navParams.get("roomname"));
    if(this.navParams.get("roomname")){
      this.joinRoom(this.navParams.get("roomname"));
    }
    let config = this.configProvider.getConfigData();
    this.nickname = JSON.parse(config).email.replace("@", "_a_").replace(".", "_p_");
    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter RoomPage');
  }
  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key) {
    console.log("joinromm"+key);
    let config = this.configProvider.getConfigData();
    this.nickname = JSON.parse(config).email.replace("@", "_a_").replace(".", "_p_");
    console.log("joinromm"+this.nickname);
    this.navCtrl.push(ChatPage, {
      key:key,
      nickname:this.nickname
    });
    console.log("joinromm"+key);
  }

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
