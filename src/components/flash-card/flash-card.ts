import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {

	// text: string;
	@Input('isFlipped') flipCard: boolean;

	constructor() {
		// console.log('Hello FlashCardComponent Component');
		// this.text = 'Hello World';
	}

}
