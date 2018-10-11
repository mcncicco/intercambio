import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/userProvider';
import { User } from '../../providers/user/user';
import { ChatPage } from '../chat/chat';
import { ConfigProvider } from '../../providers/auth-service/config';


/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {

  public chatUserEmail: string;
  public chatUser: User = new User();
  public user: User = new User();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
  private configProvider: ConfigProvider) {

      this.chatUserEmail = navParams.get('emailUsuario');
      console.log("E:"+this.chatUserEmail);
      this.userProvider.getUser(this.chatUserEmail).subscribe(
        data => {
          console.log(data);
          this.chatUser = data;
        });
          let config = configProvider.getConfigData();
    console.log("HOME"+config);
    this.user.displayName = JSON.parse(config).displayName;
    this.user.photoUrl = JSON.parse(config).photoUrl;
    this.user.email = JSON.parse(config).email;
    console.log("HOME"+this.user);
         
        
      
  }
  joinChatUser(){
    let roomkey;
    let roomname;
    if(this.chatUserEmail.length <= this.user.email.length){
      roomkey = this.chatUserEmail.replace("@", "_a_").replace(".", "_p_")+this.user.email.replace("@", "_a_").replace(".", "_p_");
    }else{
      roomkey = this.user.email.replace("@", "_a_").replace(".", "_p_")+this.chatUserEmail.replace("@", "_a_").replace(".", "_p_");
    }
    roomname = this.chatUser.displayName;
    this.navCtrl.push(ChatPage, {roomkey, roomname});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

}
