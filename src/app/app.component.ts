import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/auth-service/config';
import { TabsPage } from '../pages/tabs/tabs';
import { User } from '../providers/user/user';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform
    , statusBar: StatusBar
    , splashScreen: SplashScreen
    , afAuth: AngularFireAuth
    , configProvider: ConfigProvider) {

    const authObserver = afAuth.authState.subscribe(user => {
      console.log("1");
      if(user){
        console.log("2");
        let userLocal = new User();
        if(user.email){
          userLocal.email = user.email;
        }
        
        configProvider.setConfigData(false, userLocal);
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      }else{
        console.log("3");
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      }
      authObserver.unsubscribe();
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      let config = configProvider.getConfigData();
      
      console.log("4");
      if(config == null){
        console.log("5");
        this.rootPage = IntroPage;
        configProvider.setConfigData(false);
      }else{
        console.log("6");
        this.rootPage = SigninPage;
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
