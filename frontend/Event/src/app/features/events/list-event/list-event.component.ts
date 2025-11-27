import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
})
export class ListEventComponent implements OnInit {
  searchItem: string = '';
  eventList: Event[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getEventList().subscribe(events => {
      this.eventList = events;
    });
  }

  incLikes(event: Event) {
    event.nbrLikes++;
    // Optional: call updateEvent API
  }

  buy(event: Event) {
    if (event.nbPlaces > 0) event.nbPlaces--;
  }

  filter() {
    if (!this.searchItem.trim()) return this.eventList;
    return this.eventList.filter(e =>
      e.titre.toLowerCase().includes(this.searchItem.toLowerCase()) ||
      e.lieu.toLowerCase().includes(this.searchItem.toLowerCase())
    );
  }
}