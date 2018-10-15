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
  displayName: string;
  userEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private configProvider: ConfigProvider) {

    console.log("construtor room");
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });

    if (this.navParams.get("roomname")) {
      this.joinRoom(this.navParams.get("key"), this.navParams.get("roomname"));
    }
    let config = this.configProvider.getConfigData();
    this.userEmail = JSON.parse(config).email.replace("@", "_a_").replace(".", "_p_");
    this.displayName = JSON.parse(config).displayName.replace("@", "_a_").replace(".", "_p_");

  }

  joinRoom(key, roomname) {
    console.log("joinromm" + key);
    console.log("roomname" + roomname);
    let config = this.configProvider.getConfigData();
    this.displayName = JSON.parse(config).displayName.replace("@", "_a_").replace(".", "_p_");

    this.navCtrl.push(ChatPage, {
      key: key,
      roomname: roomname,
      nickname: this.displayName
    });

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

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    if (item.roomname.indexOf("_w_") > 1) {
      if (item.roomname.indexOf(item.roomname) > 1) {
        item.roomname = item.roomname.substring(0, item.roomname.indexOf("_w_"));
      } else {
        item.roomname = item.roomname.substring(item.roomname.indexOf("_w_") + 3, item.roomname.length);
      }
    }
    returnArr.push(item);
  });

  return returnArr;
};
