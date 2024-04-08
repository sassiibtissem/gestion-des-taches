/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
 
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { GraphQLModule } from './graphql.module';
import { AuthModule } from './pages/auth/auth.module';
import { ApolloModule } from 'apollo-angular';
import { ProjectsModule } from './pages/projects/projects.module';

import { ReactiveFormsModule } from '@angular/forms';
import { TasksModule } from './pages/tasks/tasks.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    GraphQLModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AuthModule,
    ProjectsModule,
    TasksModule,
    ApolloModule,
    NbDialogModule.forRoot(),
    ReactiveFormsModule,
 
   

    
  
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule {
}
