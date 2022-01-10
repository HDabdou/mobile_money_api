import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from 'src/app/services/admin.service';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}


@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {




  dateDebut;
   dateFin;
   nbrOp;
   solde;
   commission
   listOperations:any = [  ];
   p: number = 1;
   listeService =[]
   constructor(private _serviceAdmin: AdminService,private router:Router) {}
   currencyFormat(somme) : String{
     return Number(somme).toLocaleString() ;
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
  
      for(let p of this.listOperations){
        //console.log({date:this.getDate(i.dateoperation),service:i.operateur,traitement:i.traitement,montant:i.montant,client:this.trimer(i.infoclient)});
        liste.push(
          {

            date :p.date_operation,
           /* prenom :this.getInfo(p.infosOperation,'prenom'),
            nom :this.getInfo(p.infosOperation,'nomclient'),
            telephone:this.getInfo(p.infosOperation,'tel'),
            num_decoudeur:this.getInfo(p.infosOperation,'numDec'),
            num_carte:this.getInfo(p.infosOperation,'carte'),
            formule:this.getInfo(p.infosOperation,'formule'),
            duree:this.getInfo(p.infosOperation,'nbreMois'),
            montant:this.getInfo(p.infosOperation,'montant'),
            numero_abonne:this.getInfo(p.infosOperation,'numAbo'),
            adresse:this.getInfo(p.infosOperation,'adresse'),*/
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
  getService(arg){
    this.listeService = []
    for(let i of arg){
      if(this.listeService.indexOf(i.nomservice) == -1){
        this.listeService.push(i.nomservice)
      }
    }
    console.log(this.listeService)
  }
  recherche(){
    this._serviceAdmin.historiqueMobileMarch({debut:this.dateDebut+" 00:00:00",fin:this.dateFin+" 23:59:59",token:JSON.parse(localStorage.getItem("currentuser")).token}).then(res=>{
      console.log(res)
      if(res['status'] == 1){
      this.listOperations = res.operations
      this.getService(this.listOperations)
      this.listTemp =this.listOperations;
       this.nbrOp = this.listOperations.length;
       console.log(this.listOperations)
      }else{
        this.router.navigate(["/login"])
      }
     })
  }
  onchange(arg){
    if(arg == "tous"){
      this.listOperations = this.listTemp 
    }else{
      this.listOperations =[]
      for(let i of this.listTemp){
        if(i.nomservice == arg){
          this.listOperations.push(i)
        }
      }
    }
  }
  listTemp
   ngOnInit() {
     let dd = new Date();
     let d = dd.setDate(-30);
     let df = new Date();
     let f = dd.setDate(30);
     this.dateDebut = ((new Date(d)).toJSON()).split("T",2)[0];
     this.dateFin = ((new Date()).toJSON()).split("T",2)[0];
     this.listTemp = this.listOperations
     //console.log(JSON.parse(localStorage.getItem("currentuser")))
     this.listOperations = []
     this._serviceAdmin.historiqueMobileMarch({debut:this.dateDebut+" 00:00:00",fin:this.dateFin+" 23:59:59",token:JSON.parse(localStorage.getItem("currentuser")).token}).then(res=>{
       console.log(res)
       if(res['status'] == 1){
       this.listOperations = res.operations
       this.listTemp =this.listOperations;
       this.getService(this.listOperations)
        this.nbrOp = this.listOperations.length;
        console.log(this.listOperations)
       }else{
         this.router.navigate(["/login"])
       }
      })
     this._serviceAdmin.getsoldeMobileMarch({token:JSON.parse(localStorage.getItem("currentuser")).token}).then(res=>{
       console.log(res)
       if(res['status'] == 1){
         this.solde = res['solde']
         this.commission = res['commission']
       }else{
         console.log(res);
       }
     })
   }


}
