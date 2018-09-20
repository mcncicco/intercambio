import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the CotacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CotacaoProvider {

  private PATH = 'cidades/';
  
  constructor(public http: HttpClient,
    private db: AngularFireDatabase) {
    console.log('Hello CotacaoProvider Provider');
  }

  getCotacoes(){
    return this.http.get("http://api.promasters.net.br/cotacao/v1/valores?moedas=USD&alt=json");

  }

  items : any;
  saveCotacao() {
    
    this.getCotacoes().subscribe(data => {
      
      console.log(data);
        const response = (data as any);
        console.log(response);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
        
        console.log(data);//array
        

    });


    
  }

  


}
