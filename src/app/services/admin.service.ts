import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private url = "http://apitnt.bbstvnet.com/index.php/";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded',
      //'id':JSON.parse(localStorage.getItem("currentuser")).iduser,
      //'Timestamp':JSON.parse(localStorage.getItem("currentuser")).timestamp,
      //'Token':JSON.parse(localStorage.getItem("currentuser")).token,
    },
     
    );

   }
   public login(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"backoffice/tnt/login";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
  public changePassword(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"backoffice/tnt/changepassword";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
   public historique(param): Promise<any>{
     var myHeaders = new Headers();
     myHeaders.append("Token", JSON.parse(localStorage.getItem("currentuser")).token);
     myHeaders.append("id", JSON.parse(localStorage.getItem("currentuser")).iduser);
     myHeaders.append("Timestamp", JSON.parse(localStorage.getItem("currentuser")).timestamp);
     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
     
     var urlencoded = new URLSearchParams();
     urlencoded.append("date_debut", param.date_debut.replaceAll('-', '/'));
     urlencoded.append("date_fin", param.date_fin.replaceAll('-', '/'));
     
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: urlencoded,
     };
     
     return fetch("http://apitnt.bbstvnet.com/index.php/tntpartenaire/prod/historiqueabonnement", requestOptions)
       .then(response => response.text())
       .then(result => {return result})
       .catch(error => console.log('error', error));
    } 
    
   public getSolde(): Promise<any>{
    let params//="date_debut="+param.date_debut.replaceAll('-', '/')+"&date_fin="+param.date_fin.replaceAll('-', '/');
     //let params=param;
    console.log(params);
     
     let myheader =  {
     'id':JSON.parse(localStorage.getItem("currentuser")).iduser,
     'Timestamp':JSON.parse(localStorage.getItem("currentuser")).timestamp,
     'Token':JSON.parse(localStorage.getItem("currentuser")).token,
   }
   console.log(myheader);
     let link="http://apitnt.bbstvnet.com/index.php/tntpartenaire/prod/getSolde";
     return this.http.post(link,params,{headers:myheader}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   public historiqueCanal(param): Promise<any>{
     var myHeaders = new Headers();
      myHeaders.append("Token", JSON.parse(localStorage.getItem("currentuser")).tokencanal);
     myHeaders.append("id", JSON.parse(localStorage.getItem("currentuser")).idcanal);
     myHeaders.append("Timestamp", JSON.parse(localStorage.getItem("currentuser")).timestampcanal);
     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
     
     var urlencoded = new URLSearchParams();
     urlencoded.append("date_debut", param.date_debut.replaceAll('-', '/'));
     urlencoded.append("date_fin", param.date_fin.replaceAll('-', '/'));
     urlencoded.append("idp", JSON.parse(localStorage.getItem("currentuser")).idcanal);
     
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: urlencoded,
     };
     
     return fetch("http://apitnt.bbstvnet.com/index.php/canalpartenaire/prod/historiqueabonnement", requestOptions)
       .then(response => response.text())
       .then(result => {return result})
       .catch(error => console.log('error', error));
    } 
    
   public getSoldeCanal(): Promise<any>{
    let params//="date_debut="+param.date_debut.replaceAll('-', '/')+"&date_fin="+param.date_fin.replaceAll('-', '/');
     //let params=param;
    console.log(params);
     
     let myheader =  {
     'id':JSON.parse(localStorage.getItem("currentuser")).idcanal,
     'Timestamp':JSON.parse(localStorage.getItem("currentuser")).timestampcanal,
     'Token':JSON.parse(localStorage.getItem("currentuser")).tokencanal,
   }
   console.log(myheader);
     let link="http://apitnt.bbstvnet.com/index.php/tntpartenaire/prod/getSolde";
     return this.http.post(link,params,{headers:myheader}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   

}
