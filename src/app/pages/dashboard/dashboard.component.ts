import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  //let dd = ((new Date()).toJSON()).split("T",2)[0];
  dateDebut;
  dateFin;
  nbrOp;
  solde;
  commission
  listOperations:any = [];
  constructor(private _serviceAdmin: AdminService,private router:Router) {}
  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }
  recherche(){
    this.listOperations = []
   this._serviceAdmin.historique({date_debut:this.dateDebut,date_fin:this.dateFin}).then(res=>{
    console.log(JSON.parse(res))
      let rep = JSON.parse(res);
      if(rep['errorCode'] == 1){
        this.listOperations = JSON.parse(rep['data'])
        this.nbrOp = this.listOperations.length;
        console.log(this.listOperations)
      }else{
        alert(rep['message']);
      }
    })
  }
  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //console.log(index.toLowerCase);

        //Now convert each value to string and comma-separated
        row += index.toUpperCase() + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
        
    }
    return str;
}
errorMessage:number = 0
  getFormule(arg){
    if(arg == 1){
      return "Maana";
    }if(arg == 2){
      return "Boul-khool";
    }if(arg == 3){
      return "Maana + Boul-khool";
    }
  }
   download(){
    //let line = 
    this.errorMessage = 0
    let liste = []
  
      for(let i of this.listOperations){
        //console.log({date:this.getDate(i.dateoperation),service:i.operateur,traitement:i.traitement,montant:i.montant,client:this.trimer(i.infoclient)});
        liste.push(
          {
            date:i.dateAbo,
            prenom:i.prenom,
            nom:i.nom,
            telephone:i.tel,
            num_decoudeur:i.carte,
            num_chip:i.chip,
            formule:this.getFormule(i.formule),
            duree:i.duree,
            montant:i.montant,
            ville:i.ville,
            adresse:i.adresse,
          }
        );
      }
      console.log(liste);
      //console.log(this.ConvertToCSV(liste));
      var csvData = this.ConvertToCSV(liste);
      var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'report_'+(new Date().toLocaleString())+'.csv';/* your file name*/
      a.click();
      console.log(csvData);
      this.errorMessage = 2
      return 'success';
    
 
   
    
  }


  ngOnInit() {
    if(localStorage.getItem("currentuser") == null ){
      this.router.navigate(['/']);
    }
    let dd = new Date();
    let d = dd.setDate(-30);
    let df = new Date();
    let f = dd.setDate(30);
    this.dateDebut = ((new Date(d)).toJSON()).split("T",2)[0];
    this.dateFin = ((new Date()).toJSON()).split("T",2)[0];
    this.listOperations = []
    console.log(JSON.parse(localStorage.getItem("currentuser")))
   this._serviceAdmin.historique({date_debut:this.dateDebut,date_fin:this.dateFin}).then(res=>{
    console.log(JSON.parse(res))
    let rep = JSON.parse(res);
    if(rep['errorCode'] == 1){
      this.listOperations = JSON.parse(rep['data'])
      this.nbrOp = this.listOperations.length;
      console.log(this.listOperations)
    }else{
      alert(rep['message']);
    }
    })
    this._serviceAdmin.getSolde().then(res=>{
      console.log(res)
      if(res['errorCode'] == 1){
        this.solde = res['solde']
        this.commission = res['commissions']
      }else{
        alert(res['message']);
      }
    })
  }

}

