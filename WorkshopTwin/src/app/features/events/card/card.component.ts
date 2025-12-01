import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  
  @Input() event!: Event; 
  @Output() notifLike = new EventEmitter<Event>();
  @Output() notifBuy = new EventEmitter<Event>();

  constructor(private route: Router) {}

  likeEvent(e: Event) {
    this.notifLike.emit(e);
  }

  buyEvent(e: Event) {
    this.notifBuy.emit(e);
  }

  dateExpire(event: Event) {
    return new Date(event.date) < new Date();
  }

  participate(prix: number) {
    this.route.navigate(['/events/participate', prix]);
  }
  
}
