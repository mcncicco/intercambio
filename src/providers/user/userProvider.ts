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
          })
          .then(() => resolve()).catch((e) =>  console.log(e));
        
      
    })
  }
  getUser(key: string) {
    console.log(this.PATH + key.replace("@", "_a_").replace(".", "_p_"));
    return this.db.object(this.PATH + key.replace("@", "_a_").replace(".", "_p_"));
  }

}

