import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { RoomPage } from '../room/room';

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
  data = { roomname:'' };
  ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("1");
    this.addRoom();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }
  addRoom() {
    this.data.roomname = this.navParams.get("key");
    
    let newData = this.ref.child(this.data.roomname);
    newData.update({
      roomname:this.data.roomname
    });
    let roomname = this.data.roomname;
    this.navCtrl.pop();
    this.navCtrl.push(RoomPage, {roomname});
  }

}
