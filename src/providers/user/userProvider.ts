import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProvider {

  private PATH = 'user/';

  constructor(private db: AngularFireDatabase) {
}


  save(user: any) {
    return new Promise((resolve, reject) => {
      
        this.db.list(this.PATH)
          .update(user.email.replace("@", "_a_").replace(".", "_p_"), {
            email: user.email, 
            displayName:user.displayName, 
            photoUrl: user.photoUrl,
            
            birthday: user.birthday,
            locale: user.locale,
            hometown: user.hometown
            
          })
          .then(() => resolve()).catch((e) =>  console.log(e));
        
      
    })
  }

}

