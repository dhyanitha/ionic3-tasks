import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

	private taskItem : FormGroup;
	
	tasks: FirebaseListObservable<any>;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private formBuilder: FormBuilder,
				public db: AngularFireDatabase) {
		this.tasks = db.list('/tasks');

		this.taskItem = this.formBuilder.group({
	      title: [''],
	      description: [''],
	      deadline: [''],
	    });
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad AddTaskPage');
	}

	addTask(){
		const item = {
			created: new Date().toString(), id: new Date().getTime().toString(), 
			title: this.taskItem.value.title, description: this.taskItem.value.description,
			deadline: new Date(this.taskItem.value.deadline).toString()
		};
		console.log(JSON.stringify(item));
		this.tasks.push(item);
	}

}
