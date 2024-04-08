import { ProjectService } from './../../../@core/mock/project.service';
import { Component, Input } from '@angular/core';
import { UploadService } from '../../../@core/mock/upload.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  file: File = null;
  fileUrl: any;
  @Input() rowData: any;
  constructor() {}
  showDocumentsTreeGrid: boolean = false;

  showTreeGrid: boolean = false;

  toggleTreeGrid() {
    this.showTreeGrid = !this.showTreeGrid;
    console.log('tree gridddddddddddddddd')
  }
    ngOnInit(){
    
  if (this.rowData) {
    // Access rowData 
    console.log(this.rowData,"fileeeeeeeeeeeeeeedata");

    }}}
