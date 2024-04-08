import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../@core/mock/project.service';
import { Apollo } from 'apollo-angular';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})

export class UploadFormComponent {
  urlFile:any;
  newFileForm = new FormGroup({
    fileName: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    object: new FormControl("", Validators.required),
    keyWords: new FormControl("", Validators.required),
    projectId:new FormControl(""),
    file: new FormControl(""),
    
  })



  constructor(
   
    private projectService: ProjectService,
    private apollo: Apollo,
    private dialogRef: NbDialogRef<UploadFormComponent>,
  
  ) {}

  createForm() {
    console.log(this.newFileForm.value);
  }
  onFilechange(pdf: any) {
    const files = pdf.target.files;

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let reader = new FileReader();
        reader.readAsDataURL(file);
  
  
      reader.onload = (event) => {
        this.urlFile = (<FileReader>event.target).result;
        alert("File uploaded successfully");
      }}
    } else {
      alert("File not uploaded ");
     
  }
  
  }
async uploadFile(){
return await this.apollo
  .mutate<any>({
    mutation: this.projectService.uploadFile(this.newFileForm.value,this.urlFile),
    // call mutate function
  })
  .subscribe(({ data }) => {
    if (data) {
      console.log(data);

      this.dialogRef.close();
     
    }
  });
}
}

