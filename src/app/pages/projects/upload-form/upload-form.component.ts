import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../../../@core/mock/project.service";
import { Apollo } from "apollo-angular";
import { NbDialogRef, NbDialogService } from "@nebular/theme";
import { Router } from "@angular/router";
import { ListFilesComponent } from "../list-files/list-files.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-upload-form",
  templateUrl: "./upload-form.component.html",
  styleUrls: ["./upload-form.component.scss"],
})
export class UploadFormComponent {
  newFileForm = new FormGroup({
    fileName: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    object: new FormControl("", Validators.required),
    keyWords: new FormControl("", Validators.required),
    projectId: new FormControl("", Validators.required),
    file: new FormControl(""),
  });
  fileToUpload:any= File;
  fileCreated = false; // Flag to track project creation status
  urlFile: any;
  project: any = [];
  constructor(
    private dialogService: NbDialogService,
    private projectService: ProjectService,
    private apollo: Apollo,
    private dialogRef: NbDialogRef<UploadFormComponent>,
    private router: Router,
    // private toastr:ToastrService,
  ) {}
  ngOnInit() {
    this.getProjects();
    console.log("all projects");
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
          // this.toastr.success("File uploaded successfully");
          alert("File uploaded successfully");
        };
      }
    } else {
      // this.toastr.warning("File not upload")
      alert("File not uploaded ");
    }
  }
  async uploadFile() {
    try {
       // Await the mutation to complete
       await this.apollo.mutate<any>({
         mutation: this.projectService.uploadFile(
           this.newFileForm.value,
           this.urlFile
         ),
       }).toPromise(); // Convert the Observable to a Promise
   
       this.fileCreated = true; // Set flag to true on successful creation
       const fileData = this.newFileForm.value;
       console.log(this.fileCreated, "fileCreated");
       console.log(fileData, "dataaaaaaaaaaaaaaaa");
       this.dialogRef.close();
       this.router.navigate(["./pages/project/project-table"]);
       this.dialogService.open(ListFilesComponent, {
      
         context: { projectFile: this.fileToUpload }
            });
    } catch (error) {
      console.log(this.fileToUpload)   
       console.error('Error uploading file:', error);
       // Handle the error appropriately
    }
   }

  createForm() {
    console.log(this.newFileForm.value);
  }
  async getProjects() {
    return await this.apollo
      .query<any>({
        query: this.projectService.getProjects(),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.project = data.getProjects;
        console.log("ppppp", this.project);
      });
  }
}
