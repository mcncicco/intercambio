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
    return this.http.get("http://api.promasters.net.br/cotacao/v1/valores?alt=json").toArray();

  }

  items : any;
  saveCotacao() {
    
    this.getCotacoes().subscribe(data => {
      
        
        
      
        console.log(data);//array
        console.log(data[0]);//objeto
        console.log(data[0].toString);//objeto
        
        const response = (data[0] as any);
        console.log(response);//objeto
        const objeto_retorno = JSON.parse(response._body);
        
        
        
        
        
        //erro
        console.log(objeto_retorno);
        console.log(data[0][0]);
        console.log(data[0][1]);
        console.log(data[0][0].valores);
        
        
        
        





      

    });


    
  }

  


}
