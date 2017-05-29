import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalPage {

	taskItem: any = {};
	tags: any;
	taskContent: any;
	taskId: any;
	tasks: FirebaseListObservable<any>;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public db: AngularFireDatabase,
				public toastCtrl: ToastController) {

		this.taskId = this.navParams.get("taskId");
		this.taskItem = this.navParams.get('taskContent');
		this.taskItem.deadline = new Date(this.taskItem.deadline).toLocaleDateString();
		// console.log(JSON.stringify(this.taskContent));

		this.tasks = db.list('/tasks');
		// console.log(this.task);  
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad EditModalPage');
	}

	updateTask(task){
		this.tasks.update(this.taskId, task);
		this.presentToast('Task updated successfully');
		this.navCtrl.pop();

	}

	presentToast(msg) {
		let toast = this.toastCtrl.create({
		  message: msg,
		  duration: 3000
		});
		toast.present();
	}

}
