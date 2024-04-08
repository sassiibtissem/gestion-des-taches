import { TaskService } from './../../../@core/mock/task.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NbDialogService } from '@nebular/theme';
import { Apollo } from 'apollo-angular';
import { UploadFileComponent } from '../../projects/upload-file/upload-file.component';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  template: `
  <div *ngFor="let task of tasks">
    {{ task.task_name }} - {{ task.state }}
  </div>
`,
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      
      
      task_name: {
        title: 'Task Name',
        type: 'string',
      },
      
     projectName: {
        title: 'projectName',
        type: 'string',
      },
     description: {
        title: 'description',
        type: 'string',
      },
      start_date: {
        title: "start_date",
        type: 'html',
        valuePrepareFunction: (value) => {
          return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
      }},
    estimation_time: {
        title: 'estimation_time',
        type: 'string',
      },
      developer_name: {
        title: 'developer_name',
        type: 'number',
      },
      
      state: {
        title: 'state',
        type: 'number',
      },
     
      add_doc: {
        title: "Add Document",
        type: 'custom',
        renderComponent: UploadFileComponent
        
           
          

               
      }}}

  source: LocalDataSource = new LocalDataSource();
  tasks: any[] = [];

  constructor(
    private dialogService: NbDialogService ,
    private taskService: TaskService,
    private apollo:Apollo
    
  ) {
    
  }
 
// delete un row in the table 
onDeleteConfirm(event): void {
  console.log(event, "evennnnnnt");
  if (window.confirm("Are you sure you want to delete?")) {
    event.confirm.resolve();
    this.removeTask(event);
  } else {
    event.confirm.reject();
  }
}
removeTask(event) {
  console.log(event.data._id, "dataaaaaaaaaaaa");
  this.apollo
    .mutate<any>({
      mutation: this.taskService.removeTask(event.data._id),
    })
    .subscribe(({ data }) => {
      console.log("removed data", data);
      this.source.load(this.tasks);
    });
}
  // pour faire update d'un projet
  onEditConfirm(event){
  console.log(event,"event");
  this.edit(event);
}
edit(event) {
  console.log( event, "here event");
  this.apollo
    .mutate<any>({
      mutation: this.taskService.edit(event.newData),
    })
    .subscribe(({ data }) => {
      console.log("Updated data", data);
    });
  }
async getTasks(){
   this.apollo
  .query<any>({
  query: this.taskService.getTasks(),

  })
  .subscribe(({ data }) => {
    console.log("all data", data);
    this.tasks = data.getTasks;
    console.log('ssssssssss',this.tasks)
    
  
  });

  }
//   // ouvrir dialogue pour la création du tache
  addTaskDialog() {
    const dialogReference = this.dialogService.open(AddTaskComponent, {
      context: {
        
      },
    });
    dialogReference.onClose.subscribe
    (() => {
      this.getTasks(); // Rechargez les tasks après la fermeture du dialogue
    });
  }
  ngOnInit() {
    //   this.getTasksByProject()
    this.getTasks()}
  }
