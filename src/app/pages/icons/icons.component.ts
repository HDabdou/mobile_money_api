import { Component, OnInit } from "@angular/core";
import { AdminService } from 'src/app/services/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
   //let dd = ((new Date()).toJSON()).split("T",2)[0];
   dateDebut;
   dateFin;
   nbrOp;
   solde;
   commission
   listOperations:any = [];
   p: number = 1;
   constructor(private _serviceAdmin: AdminService) {}
   nomHandle(arg){
     return arg.split("BGD")[1]
   }
   formuleHandle(arg){
     return arg.replace("u00e0","à")
   }
   handleForExcell(arg){
   
    let b = [];
    for(let i of arg){
        b.push({date:i.date_operation,
          prenom:this.getInfo(i.infosOperation,'prenom'),
          nom:this.getInfo(i.infosOperation,'nomclient').split("BGD")[1],
          telephone:this.getInfo(i.infosOperation,'tel'),
          numDecodeur:this.getInfo(i.infosOperation,'numDec'),
          carte:this.getInfo(i.infosOperation,'carte'),
          formule:this.getInfo(i.infosOperation,'formule').replace("u00e0","à"),
          nbreMois:this.getInfo(i.infosOperation,'nbreMois'),
          montant:this.getInfo(i.infosOperation,'montant'),
          numAbonne:this.getInfo(i.infosOperation,'numAbo'),
          })
    }
    return b;
}
  exportToExcel(): void {
    let b = this.handleForExcell(this.listOperations)
    // Here is simple example how to export to excel by https://www.npmjs.com/package/xlsx
    try {
      /* generate worksheet */
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(b);
    
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      /* save to file */
      XLSX.writeFile(wb, 'rapport du '+new Date().toJSON()+'.xlsx');
    } catch (err) {
      console.error('export error', err);
    }
  }
   currencyFormat(somme) : String{
     return Number(somme).toLocaleString() ;
   }
   recherche(){
     this.listOperations = []
    this._serviceAdmin.historiqueCanal({date_debut:this.dateDebut,date_fin:this.dateFin}).then(res=>{
    //  console.log(JSON.parse(res))
      this.listOperations = JSON.parse(res)
       this.nbrOp = this.listOperations.length;
     //  console.log(this.listOperations)
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
  
      for(let p of this.listOperations){
        //console.log({date:this.getDate(i.dateoperation),service:i.operateur,traitement:i.traitement,montant:i.montant,client:this.trimer(i.infoclient)});
        liste.push(
          {

            date :p.date_operation,
            prenom :this.getInfo(p.infosOperation,'prenom'),
            nom :this.getInfo(p.infosOperation,'nomclient'),
            telephone:this.getInfo(p.infosOperation,'tel'),
            num_decoudeur:this.getInfo(p.infosOperation,'numDec'),
            num_carte:this.getInfo(p.infosOperation,'carte'),
            formule:this.getInfo(p.infosOperation,'formule'),
            duree:this.getInfo(p.infosOperation,'nbreMois'),
            montant:this.getInfo(p.infosOperation,'montant'),
            numero_abonne:this.getInfo(p.infosOperation,'numAbo'),
            adresse:this.getInfo(p.infosOperation,'adresse'),
          }
        );
      }
    //  console.log(liste);
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
    //  console.log(csvData);
      this.errorMessage = 2
      return 'success';
    
 
   
    
  }
 
   ngOnInit() {
     let dd = new Date();
     let d = dd.setDate(-30);
     let df = new Date();
     let f = dd.setDate(30);
     this.dateDebut = ((new Date(d)).toJSON()).split("T",2)[0];
     this.dateFin = ((new Date()).toJSON()).split("T",2)[0];
     this.listOperations = []
     //console.log(JSON.parse(localStorage.getItem("currentuser")))
    this._serviceAdmin.historiqueCanal({date_debut:this.dateDebut,date_fin:this.dateFin}).then(res=>{
   //  console.log(JSON.parse(res))
      this.listOperations = JSON.parse(res)
       this.nbrOp = this.listOperations.length;
     //  console.log(this.listOperations)
     
     })
     this._serviceAdmin.getSoldeCanal().then(res=>{
     //  console.log(res)
       if(res['errorCode'] == 1){
         this.solde = res['solde']
         this.commission = res['commissions']
       }else{
       //  console.log(res);
       }
     })
   }
   getInfo(objet,nom){
     
    let ob = JSON.parse(objet);
    if(nom == "numAbo"){
      return ob.numAbo;
    }
    if(nom == "carte"){
      return ob.carte;
    }
    if(nom == "nom"){
      return ob.nom;
    }
    if(nom == "prenom"){
      return ob.prenom;
    }
    if(nom == "adresse"){
      return ob.adresse;
    }
    if(nom == "formule"){
      return ob.formule;
    }
    if(nom == "duree"){
      return ob.duree;
    }
    if(nom == "montant"){
      return ob.montant;
    }
    if(nom == "operation"){
      return ob.operation;
    }
    if(nom == "numDec"){
      return ob.numDec;
    }
    if(nom == "numCarte"){
      return ob.numCarte;
    }
    if(nom == "tel"){
      return ob.tel;
    }
    if(nom == "nomclient"){
      return ob.nomclient;
    }
    if(nom == "nbreMois"){
      return ob.nbreMois;
    }
    return "";
   }
}
