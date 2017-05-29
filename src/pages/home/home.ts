import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, PopoverController } from 'ionic-angular';
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
				public db: AngularFireDatabase,
				public popoverCtrl: PopoverController) {
		this.tasks = db.list('/tasks');
	}

	addTask(){
		this.navCtrl.push(AddTaskPage);
	}

	presentPopover(myEvent) {
	    let popover = this.popoverCtrl.create(PopoverPage);
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
      <ion-list-header>Ionic</ion-list-header>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})

export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}