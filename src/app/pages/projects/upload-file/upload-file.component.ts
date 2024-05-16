import { ProjectService } from "./../../../@core/mock/project.service";
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";

import { Apollo } from "apollo-angular";
import { UploadFormComponent } from "../upload-form/upload-form.component";
import { NbDialogService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { ListFilesComponent } from "../list-files/list-files.component";

@Component({
  selector: "c",

  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnChanges {
  @Input() projectFile: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectFile && changes.projectFile.currentValue) {
      console.log("projectFile updated in child", this.projectFile);
      // Perform additional actions if needed when projectFile is updated
    }
  }

  constructor(
    private dialogService: NbDialogService,
    private projectService: ProjectService,
    private apollo: Apollo
  ) {}

  async getFile(projectId) {
    await this.apollo
      .query<any>({
        query: this.projectService.getFile(projectId),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.projectFile = data.getAllFilesByProject;
        console.log("file_name", this.projectFile);
      });
  }
  open(){
    this.dialogService.open(ListFilesComponent)
  }

  uploadDocuments() {
    this.dialogService.open(UploadFormComponent, {
      context: {},
    }).onClose.subscribe((data) => {
      if (data) {
        // Update the component's state to include the newly uploaded file
        this.projectFile.push(data.fileName); // Assuming data contains the file name
      }
   });
  }
  ngOnIntit(){
    console.log(this.projectFile,"filessssss")
    this.getFile
  }
}
