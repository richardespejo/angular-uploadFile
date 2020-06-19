import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  contentInformation: boolean;
  extention: any[] = ['xls','txt','csv'];
  dropZone: boolean;
  errorZone: boolean;
  okZone: boolean;
  fileData :any;
  fileName: string;
  fileSize: string;
  fileFormGroup: FormGroup;
  errorFile: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.contentInformation = false;
    this.dropZone = true;
    this.okZone = false;
    this.buildForm();
  }
  
  private buildForm(){
    this.fileFormGroup = this._formBuilder.group({
      file: ['', Validators.required ]
    });
  }
  get file(){
    return this.fileFormGroup.get('file');
  }
  get sourceData(){
    return this.fileFormGroup.get('sourceData');
  }

  hideContentInformation(){
    return this.contentInformation = !this.contentInformation;
  }

  fileHandler(event){
    this.fileData = event;
    if(this.extention.includes(event[0].name.split('.').pop())) {
      if(event[0].size > 2000000){
        this.errorHandler('Tamaño maximo permitido 2mb');
      } else if(event[0].size == 0){
        this.errorHandler('El archivo adjunto está vacío');
      } else {
        this.successHandler(event);
      }
    } else {
      this.errorHandler('Formato de archivo incompatible, por favor use las Plantillas de Carga propuestas');
    }
  }

  successHandler(event: any) {
    this.errorFile = [];
    this.errorZone = false;
    this.dropZone = false;
    this.okZone = true;
    this.fileName = event[0].name;
    this.fileSize = event[0].size;
  }

  errorHandler(message: string) {
    this.errorFile.push(message);
    this.errorZone = true;
    this.dropZone = false;
    this.okZone = false;
  }

  processFile(){
    let file : File = this.fileData.item(0);
    
  }
}
