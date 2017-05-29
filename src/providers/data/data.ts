import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const url = 'assets/data';

@Injectable()
export class Data {

	data: any;
 
    constructor(public http: Http) {
 
    }
 
    load(subject){
 
        if(this.data){
            return Promise.resolve(this.data);
        }
 
        return new Promise(resolve => {
 
            this.http.get(url+'/'+subject+'/questions.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });
 
        });
    }

}
