import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConfigProvider } from '../../providers/auth-service/config';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;

  ref = firebase.database().ref('chatrooms/');

  public refresher;
  public isRefreshing: boolean = false;

  public listCities = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAhth: AngularFireAuth,
  private configProvider: ConfigProvider) {

    let config = configProvider.getConfigData();
    
    this.roomkey = this.navParams.get("roomKey") as string;
    this.addRoom();
    this.joinRoom(this.roomkey);
    console.log("ChatPage"+this.roomkey);
    this.nickname = JSON.parse(config).email;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
 
    let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    /*joinData.set({
      type:'join',
      user:this.nickname,
      message:this.nickname+' has joined this room.',
      sendDate:Date()
    });*/
    this.data.message = '';
  
    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  ionViewDidEnter() {
    console.log("HomePage");
  }

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }

  exitChat() {
    let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    /*exitData.set({
      type:'exit',
      user:this.nickname,
      message:this.nickname+' has exited this room.',
      sendDate:Date()
    });*/
  
    this.offStatus = true;
  
    this.navCtrl.setRoot(RoomPage, {
      nickname:this.nickname
    });
  }
  
  joinRoom(key) {
    if(this.roomkey){
      key = this.roomkey;
    }
    if(key){
    console.log("joinromm"+this.roomkey);
    this.navCtrl.push(ChatPage, {
      key:key,
      nickname:this.navParams.get("nickname")
    });
  }
  }

  addRoom() {
    let newData = this.ref.child(this.roomkey);
    newData.update({
      roomname:this.roomkey
    });
    let roomname = this.roomkey
    
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