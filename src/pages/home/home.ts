import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddTaskPage } from '../add-task/add-task';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	tasks: FirebaseListObservable<any>;

	constructor(public navCtrl: NavController,
				public modalCtrl: ModalController,
				public db: AngularFireDatabase) {
		this.tasks = db.list('/tasks');
	}

	addTask(){
		this.navCtrl.push(AddTaskPage);
	}

}
