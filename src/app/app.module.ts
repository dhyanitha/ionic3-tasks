import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddTaskPage } from '../pages/add-task/add-task';
import { SubjectPage } from '../pages/subject/subject';
import { FlashCardsPage } from '../pages/flash-cards/flash-cards';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormatdatePipe } from '../pipes/formatdate/formatdate';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data/data';
import { HttpModule } from '@angular/http';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDuJ9YArpEIscOX5_iPBeMhPldLiTNlmQw",
    authDomain: "my-task-planner.firebaseapp.com",
    databaseURL: "https://my-task-planner.firebaseio.com",
    projectId: "my-task-planner",
    storageBucket: "my-task-planner.appspot.com",
    messagingSenderId: "1065892340674"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddTaskPage,
    SubjectPage,
    FormatdatePipe,
    FlashCardsPage,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SubjectPage,
    AddTaskPage,
    FlashCardsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
  ]
})
export class AppModule {}
