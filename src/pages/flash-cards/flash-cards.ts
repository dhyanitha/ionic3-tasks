import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const url = 'assets/data';

@IonicPage()
@Component({
  selector: 'page-flash-cards',
  templateUrl: 'flash-cards.html',
})
export class FlashCardsPage {

	@ViewChild(Slides) slides: Slides;
 
    hasAnswered: boolean = false;
    score: number = 0;
    total: number = 0;
    slideOptions: any;
    questions: any;
    subject: any;
 
    constructor(public navCtrl: NavController,
                public params: NavParams,
                public toastCtrl: ToastController,
                public http: Http) {

        this.subject = this.params.get('course');
 
    }
 
    ionViewWillEnter() {

        this.slides.lockSwipes(true);
        const subject = this._formatSubject(this.subject);
        
        this.http.get(url+'/'+subject+'/questions.json').map(res => res.json()).subscribe(data => {
            data = data.questions;
            this.total = data.length;
            data = this.randomizeSequence(data);
 
            data.map((question) => {
                let originalOrder = question.answers;
                question.answers = this.randomizeSequence(originalOrder);
                return question;
            });     
 
            this.questions = data;
 
        });
 
    }

    _formatSubject(subject){
        while(subject.indexOf(" ") != -1){
            subject = subject.replace(" ","");
        }
        return subject;
    }
 
    nextSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }
 
    selectAnswer(answer, question){
 
        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;
 
        if(answer.correct){
            this.score++;
            this.presentToast('Correct! '+"\uD83D\uDE00");
        }
        else{
            this.presentToast('Wrong! '+"\uD83D\uDE14");
        }
 
        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 3000);
    }
 
    randomizeSequence(sequence: any[]): any[] {
 
        for (let i = sequence.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = sequence[i];
            sequence[i] = sequence[j];
            sequence[j] = temp;
        }
 
        return sequence;
 
    }
 
    restartQuiz(){
        this.score = 0;
        this.slides.slideTo(1, 500);
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            // console.log('Dismissed toast');
        });

        toast.present();
    }

}
