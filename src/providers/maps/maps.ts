import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/observable/from'; 
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class MapsProvider {


  items: FirebaseListObservable<any[]>;
  private PATH = 'localizacao/';
  private PATH_CITIES = 'cidades/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    console.log("GETALLLOCATIONS");
   return this.db.list(this.PATH);
  }
  

  get(key: string) {
    /* return this.db.object(this.PATH + key).snapshotChanges()
       .map(c => {
         return { key: c.key, ...c.payload.val() };
       });*/
  }

  save(localizacao: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH)
        .update(localizacao.email.replace("@", "_a_").replace(".", "_p_"), 
        { email: localizacao.email, 
          latitude: localizacao.latitude, 
          longitude: localizacao.longitude,
          photoUrl: localizacao.photoUrl })
        .then(() => resolve())
        .catch((e) => reject(e));

    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
 