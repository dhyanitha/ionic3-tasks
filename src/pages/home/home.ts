import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, PopoverController, AlertController, NavParams } from 'ionic-angular';
import { AddTaskPage } from '../add-task/add-task';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EditModalPage } from '../edit-modal/edit-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	tasks: FirebaseListObservable<any>;

	constructor(public navCtrl: NavController,
				public modalCtrl: ModalController,
				public db: AngularFireDatabase,
				public popoverCtrl: PopoverController) {
		this.tasks = db.list('/tasks');
	}

	addTask(){
		this.navCtrl.push(AddTaskPage);
	}

	presentPopover(myEvent, taskId, taskContent) {
	    let popover = this.popoverCtrl.create(PopoverPage, {taskId: taskId, content: taskContent});
	    popover.present({
	      ev: myEvent
	    });
	}

	sortByTag(tag){
		// console.log("Tag => "+tag);
	}

}


@Component({
  template: `
    <ion-list>
      <ion-list-header>OPTIONS</ion-list-header>
      <button ion-item (click)="edit()">Edit</button>
      <button ion-item (click)="delete()">Delete</button>
    </ion-list>
  `
})

export class PopoverPage {
	taskId: any;
	taskContent: any;
	tasks: FirebaseListObservable<any>;
	constructor(public viewCtrl: ViewController, 
				public navCtrl: NavController,
				public alertCtrl: AlertController, 
				public params: NavParams,
				public db: AngularFireDatabase) {

		this.tasks = db.list('/tasks');
		this.taskId = this.params.get('taskId');
		this.taskContent = this.params.get('content');
	}

	edit() {
		// console.log(this.taskId);
		this.navCtrl.push(EditModalPage, {taskId :this.taskId, taskContent: this.taskContent });
		this.viewCtrl.dismiss();
	}

	delete(){
		let confirm = this.alertCtrl.create({
			title: 'Confirm delete',
			message: 'Do you want to delete this task?',
			buttons: [
			{
				text: 'Cancel',
				handler: () => {
					// console.log('Disagree clicked');
					this.viewCtrl.dismiss();
				}
			},
			{
				text: 'Ok',
				handler: () => {
					this.tasks.remove(this.taskId);
					this.viewCtrl.dismiss();
				}
			}
			]
			});
			confirm.present();
	}
}