import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { FlashCardsPage } from '../flash-cards/flash-cards';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

	courses: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams) {

		this.courses = [
            'Engineering Maths',
            'Discrete Maths',
            'Digital Logic',
            'Operating Systems',
            'Data Structures',
            'Algorithms',
            'Theory of Computation',
            'Compiler Design',
            'Computer Networks',
            'Database Management Systems',
            'Aptitude',
            'Computer Organization',
            'Verbal'
        ];
	}

	reorderItems(indexes){
        this.courses = reorderArray(this.courses, indexes);
    }

    loadFlashCards(course){
    	this.navCtrl.push(FlashCardsPage,{ course: course });
    }

}
