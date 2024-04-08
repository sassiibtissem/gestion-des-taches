import { Apollo, gql } from "apollo-angular";
import { Injectable } from "@angular/core";

//GET_TaskS qui contient une requête GraphQL.

// getProjects() {

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private Apollo: Apollo) {}

  //create task
  createTask(newTaskData: any) {
    return gql`
      mutation {
        createTask(createTaskInput:{ 
        
          projectName:"${newTaskData.projectName}",
        task_name: "${newTaskData.task_name}",
        projectId:"${newTaskData.projectId}",
        description:"${newTaskData.description}",
        start_date:"${newTaskData.start_date}",
        estimation_time:"${newTaskData.estimation_time}",
        developerId:"${newTaskData.developerId}",
        developer_name:"${newTaskData.developer_name}",
        state:"${newTaskData.state}"
        }){
          
          projectId
          task_name
          projectName
          description
          start_date
          estimation_time
          developer_name
          developerId
          state
      
      }}
      
        `;
  }
  removeTask(_id) {
    return gql`
    mutation {
      removeTask(_id:"${_id}") {
    
    task_name
    projectName
     description
      developer_name
      start_date
      estimation_time
      state
      }
    }
    `;
  }
  // update task//
  edit(newData: any) {
    return gql`mutation {
      updateTask(_id:"${newData._id}",updateTaskInput: {
    
       task_name: "${newData.task_name}",
       projectId:"${newData.projectId}",
        projectName:"${newData.projectName}",
        description:"${newData.description}",
        developer_name:"${newData.developer_name}",
        start_date: "${newData.start_date}",
      estimation_time:"${newData.estimation_time}",
        state:"${newData.state}",
      
      }) {
     
      task_name
        projectId
    projectName
      description
      developer_name
      start_date
      estimation_time
      state
     
      }}
    `;
    }
  getTasksByProject() {
    return gql`
      query {
        getTasksByProject {
          ID
          description
          developer_name
        }
      }
    `;
  }
  getProjects() {
    return gql`
      query {
        getProjects {
          _id
          projectName
          subject
          description
          leader_name
          start_date
          end_date
        }
      }
    `;
  }
  getTasks() {
    return gql`
    query {
      getTasks {
       projectId
       developerId
       projectName
       task_name
       description
       developer_name
       start_date
       estimation_time
       state
       
     
     
      
        
       }
     }
    `;
  }
  getTasksToProject() {
    return gql`
      query {
        getTasksToProject {
          ID
          description
          developer_name
        }
      }
    `;
  }
  // get developer
  getAllUsers() {
    return gql`
   query{ 
    getDevelopers{
      _id
    firstName,
      lastName
      
      
      
     }
  }`;
  }
  //get tasks to project By state
getTasksToprojectBystate(id){
  return gql`
  query{getTasksByProject(projectId:"${id}"){
    _id,
    tasks{projectId,description,state,estimation_time}
   }}
  
  
  
  `
}

getAllTasksToproject(id){
  return gql`
  query
{getTasksToProject(projectId:"${id}")
{
  id
  description,
  task_name,
  state
  }
} `
}
upDateTaskState(id,state){
  return gql`
  mutation {
    updateTaskState(taskId:"${id}", newState: "${state}"){
      id
      description
      task_name
      state
    }
  }`
}



}
