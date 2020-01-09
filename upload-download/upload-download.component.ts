import { Component, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http'; 
import { encode } from 'punycode';

@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.css']
})
export class UploadDownloadComponent implements OnInit{
  
  tableList: Object;
  getApi;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(){
    this.httpClient.get('/api/config/config_table').subscribe(response => {
    this.tableList=response;
    this.getApi = this.tableList["0"].getapi;
  });
  }
  
  onSubmit(){
    try{
      let SelectedList;
      let obj;
      this.httpClient.get(this.getApi).subscribe(response => {
      SelectedList = response;
      //try remove the if condition for two tables 
      if(typeof response == "object"){
        console.log("LIST");
        console.log(SelectedList);
      }
    for(let x in SelectedList){
        SelectedList[x].id = null;
    }
    obj = {
      [this.tableList["0"].modelName] : SelectedList
    };
    var json = JSON.stringify(obj); 
    console.log("STRING-JSON");
    console.log(json);
    let blob:any = new Blob([json], { type: 'text/json; charset=utf-8' });
    window.URL.createObjectURL(blob);
    fileSaver.saveAs(blob,'config.json');
    })
  }
    catch{
      error => console.log('Error downloading the file');
    }
    finally{
      console.info('File downloaded successfully');
    }
    
  }

}

