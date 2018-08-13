import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProvider {

  private PATH = 'user/';

  constructor(private db: AngularFireDatabase) {
}


  save(user: any) {
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.PATH)
          .update(user.key, {email: user.email, nome:user.nome})
          .then(() => resolve())
          .catch((e) => reject(e));
        
      } else {
        this.db.list(this.PATH)
          .push({email: user.email, nome: user.nome })
          .then(() => resolve());
        
      }
    })
  }

}
