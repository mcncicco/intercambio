import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ChatPage } from '../chat/chat';



@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("construtor room");
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
    console.log(this.navParams.get("roomname"));
    if(this.navParams.get("roomname")){
      this.joinRoom(this.navParams.get("roomname"));
    }
    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key) {
    console.log("joinromm"+key);
    this.navCtrl.push(ChatPage, {
      key:key,
      nickname:this.navParams.get("nickname")
    });
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
