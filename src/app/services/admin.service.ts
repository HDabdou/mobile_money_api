import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private url = "https://apitnt.bbstvnet.com/index.php/sentool/mobilemoney/backoffice";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders(
      {'Content-Type': 'content-type application/json',
      //'id':JSON.parse(localStorage.getItem("currentuser")).iduser,
      //'Timestamp':JSON.parse(localStorage.getItem("currentuser")).timestamp,
      //'Token':JSON.parse(localStorage.getItem("currentuser")).token,
    },
     
    );
   }
   public login(param): Promise<any>{
    let params=param;
    
    
    let link=this.url+"/login";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
  public changePassword(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    
    
    let link=this.url+"/backoffice/tnt/changepassword";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
   public historique(param): Promise<any>{
     var myHeaders = new Headers();
     myHeaders.append("Token", JSON.parse(localStorage.getItem("currentuser")).data.message.token);
     myHeaders.append("id", JSON.parse(localStorage.getItem("currentuser")).data.message.iduser);
     myHeaders.append("Timestamp", JSON.parse(localStorage.getItem("currentuser")).data.message.timestamp);
     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
     
     var urlencoded = new URLSearchParams();
     urlencoded.append("date_debut", param.date_debut.replaceAll('-', '/'));
     urlencoded.append("date_fin", param.date_fin.replaceAll('-', '/'));
     
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: urlencoded,
     };
     
     return fetch("https://apitnt.bbstvnet.com/index.php/tntpartenaire/prod/historiqueabonnement", requestOptions)
       .then(response => response.text())
       .then(result => {return result})
       .catch(error => {return error});
    } 
    
   public getSolde(): Promise<any>{
    let params//="date_debut="+param.date_debut.replaceAll('-', '/')+"&date_fin="+param.date_fin.replaceAll('-', '/');
     //let params=param;
    
     
     let myheader =  {
     'id':JSON.parse(localStorage.getItem("currentuser")).data.message.iduser,
     'Timestamp':JSON.parse(localStorage.getItem("currentuser")).data.message.timestamp,
     'Token':JSON.parse(localStorage.getItem("currentuser")).data.message.token,
   }
     let link="https://apitnt.bbstvnet.com/index.php/tntpartenaire/prod/getSolde";
     return this.http.post(link,params,{headers:myheader}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
   } 
   public historiqueCanal(param): Promise<any>{
     var myHeaders = new Headers();
      myHeaders.append("Token", JSON.parse(localStorage.getItem("currentuser")).data.message.tokencanal);
     myHeaders.append("id", JSON.parse(localStorage.getItem("currentuser")).data.message.idcanal);
     myHeaders.append("Timestamp", JSON.parse(localStorage.getItem("currentuser")).data.message.timestampcanal);
     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
     
     var urlencoded = new URLSearchParams();
     urlencoded.append("date_debut", param.date_debut.replaceAll('-', '/'));
     urlencoded.append("date_fin", param.date_fin.replaceAll('-', '/'));
     urlencoded.append("idp", JSON.parse(localStorage.getItem("currentuser")).data.message.idcanal);
     
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: urlencoded,
     };
     
     return fetch("https://apitnt.bbstvnet.com/index.php/canalpartenaire/prod/historiqueabonnement", requestOptions)
       .then(response => response.text())
       .then(result => {return result})
       .catch(error => {return error});
    } 
    
   public getSoldeCanal(): Promise<any>{
    let params//="date_debut="+param.date_debut.replaceAll('-', '/')+"&date_fin="+param.date_fin.replaceAll('-', '/');
     //let params=param;
    //
     
     let myheader =  {
     'id':JSON.parse(localStorage.getItem("currentuser")).data.message.idcanal,
     'Timestamp':JSON.parse(localStorage.getItem("currentuser")).data.message.timestampcanal,
     'Token':JSON.parse(localStorage.getItem("currentuser")).data.message.tokencanal,
   }
     let link="https://apitnt.bbstvnet.com/index.php/tntpartenaire/prod/getSolde";
     return this.http.post(link,params,{headers:myheader}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
   } 
   
 
   public historiqueMobile(param): Promise<any>{
    let params=param;
    
    let link=this.url+"/historique";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
  
  public getsoldeMobile(param): Promise<any>{
    let params=param;
    
    let link=this.url+"/getSolde";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 


   public historiqueMobileBulk(param): Promise<any>{
    let params=param;
    
    let link=this.url+"/historiqueBulk";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
  
  public getsoldeMobileBulk(param): Promise<any>{
    let params=param;
    
    let link=this.url+"/getSoldeBulk";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 


   public historiqueMobileMarch(param): Promise<any>{
    let params=param;
    
    let link=this.url+"/historiqueMarch";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
  
  public getsoldeMobileMarch(param): Promise<any>{
    let params=param;
    
    let link=this.url+"/getSoldeMarch";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 

  
}
