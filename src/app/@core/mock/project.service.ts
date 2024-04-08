import { Injectable } from "@angular/core";

import { Apollo, gql } from "apollo-angular";
//GET_PROJECTS qui contient une requête GraphQL.

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  loading: boolean;
  projects: any = [];

  constructor(private apollo: Apollo) {}

  getProjects() {
    return gql`
      query {
        getProjects {
          _id
          projectName
          subject
          description
          leader_name
          userId
          start_date
          end_date
          file
        }
      }
    `;
  }
    getFileUrl(formData) {
      return this.apollo.query({
        query: gql`
          query GetFileUrl($fileName: String!) {
            getFileUrl(fileName: $fileName)
          }
        `,
        variables: {
          fileName: formData
        }
      });
    }
  
  // getUser selon project
  getAllUsers() {
    return gql`
      query {
        getUserss {
          _id
          firstName
          lastName
        }
      }
    `;
  }
  //create project
  createProject(newProjectData: any,file) {
    return gql`
      mutation {
        createProject(createProjectInput: {
          projectName: "${newProjectData.projectName}"
          subject: "${newProjectData.subject}"
          description: "${newProjectData.description}"
          userId: "${newProjectData.userId}"
          start_date: "${newProjectData.start_date}"
          end_date: "${newProjectData.end_date}"
          file: "${file}"
        }) {
          _id
          projectName
          subject
          description
          leader_name
          start_date
          end_date
          file
        }
      }
    `;
  }
  // upload File
  uploadFile(newFileData: any,file) {
    return gql`
      mutation {
        createFile(createFileInput: {
          fileName: "${newFileData.fileName}"
          object: "${newFileData.object}"
          date: "${newFileData.date}"
          keyWords: "${newFileData.keyWords}"
          projectId:"${newFileData.projectId}"
          file: "${file}"
        }) {
          _id
          fileName
          object
          date
          keyWords
          projectId
          file
        }
      }
    `;
  }
  // UpDate Project
  edit(newData: any) {
    return gql`mutation {
      updateProject(_id: "${newData._id}",updateProjectInput: {
       
        projectName: "${newData.projectName}",
        subject: "${newData.subject}",
        description:"${newData.description}",
        leader_name:"${newData.leader_name}"
        start_date: "${newData.start_date}",
        end_date: "${newData.end_date}"
      
      }) {
   
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

  removeProject(_id: string) {
    return gql`
      mutation {
        removeProject(_id: "${_id}") {
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

  getUserByProject() {
    return gql`
      query {
        getProjects {
          userId
          leader_name
          projectName
          description
          subject
          start_date
          end_date
          file
        }
      }
    `;
  }
  getDeveloperByProject() {
    return gql`
      query {
        getDeveloperByProjects {
          userId
          developer_name
          project_name
          projectId
          description
          subject
          start_date
          end_date
        }
      }
    `;
  }
}
