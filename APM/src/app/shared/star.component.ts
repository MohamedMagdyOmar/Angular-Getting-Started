import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class starComponent implements OnChanges{
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        this.starWidth = this.rating * 75 / 5;
    }
    @Input() rating: number;
    starWidth: number;

    // here we declare an event called ratingClicked
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    onClick():void{
        this.ratingClicked.emit(`the rating ${this.rating} was clicked`)
    }
}