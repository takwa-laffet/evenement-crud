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
  filteredList: Event[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.loadEventsFromBackend();
  }

  loadEventsFromBackend() {
    this.data.getEventList().subscribe({
      next: (events) => {
        this.eventList = events;
        this.filteredList = events;
      },
      error: (err) => console.error('Error loading events:', err),
    });
  }

  filter() {
    if (!this.searchItem.trim()) {
      this.filteredList = this.eventList;
      return this.filteredList;
    }

    this.filteredList = this.eventList.filter((event) =>
      event.titre.toLowerCase().includes(this.searchItem.toLowerCase()) ||
      event.lieu.toLowerCase().includes(this.searchItem.toLowerCase())
    );

    return this.filteredList;
  }

  // Frontend only: likes
  incLikes(event: Event) {
    event.nbrLikes++;
  }

  // Frontend only: buy ticket
  buy(event: Event) {
    if (event.nbPlaces > 0) event.nbPlaces--;
  }

  dateExpire(event: Event) {
    return new Date(event.date) < new Date();
  }
}
