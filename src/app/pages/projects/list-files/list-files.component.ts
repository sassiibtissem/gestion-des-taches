import { Component, Input, OnInit } from "@angular/core";
import { ProjectService } from "../../../@core/mock/project.service";
import { Apollo } from "apollo-angular";
import { PassingDataService } from "../../../@core/mock/passing-data.service";

@Component({
  selector: "ngx-list-files",
  templateUrl: "./list-files.component.html",
  styleUrls: ["./list-files.component.scss"],
})
export class ListFilesComponent implements OnInit {
  projectFile: File[] = [];
  selectedRowId = '';
  

  constructor(private projectService: ProjectService, private apollo: Apollo,private passingdata : PassingDataService) {
    

  }

  async getFile(selectedRowId: string ) {
    console.log("FINAAAAL :" , selectedRowId)
    
    if (this.selectedRowId === null) {
      console.error('selectedRowId is not set');
      return;
    }
  
    try {
      const { data } = await this.apollo.query<any>({
        query: this.projectService.getFile(this.selectedRowId),
      }).toPromise();
  
      console.log("selectedRowId", this.selectedRowId);
      this.projectFile = data.getAllFilesByProject;

      console.log("file_name", this.projectFile);
    } catch (error) {
      console.error("Error fetching files", error);
    }
  }
  // setSelectedRowId(_id: string) {
  //   this.selectedRowId = _id;
  //   console.log('selectedRowId',this.selectedRowId)
  //   this.getFile();
  // }
  
  
 

  onFileSelected(event: any) {
    const file = event.target.file[0]; // Assuming single file upload
    this.projectFile.push(file); // Add the file to the array
  }



  ngOnInit() {
    this.getFile
    console.log('getFileee')
    console.log('selectedRowId in child component:', this.selectedRowId);

    
    this.selectedRowId='';
    this.passingdata.currentMessage.subscribe(message => 
      {
      console.log("passed message in files : ",message)
      this.selectedRowId = message;
      this.getFile(this.selectedRowId);
      });
    

    // console.log(this.projectFile, "files");
    // Assuming you have a projectId to fetch files for
    //  const projectId = '66261da29b1a0414e13f07f5';

  }

  //   ngOnChanges(changes: SimpleChanges): void {
  //     if (changes.selectedRowId && !changes.selectedRowId.firstChange) {
  //       console.log('selectedRowId changed:', this.selectedRowId);
   
  //   }
  // }
}
