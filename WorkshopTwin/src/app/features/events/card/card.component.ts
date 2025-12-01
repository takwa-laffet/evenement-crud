import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  

  events: Event[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.dataService.getEventList().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load events.';
        this.isLoading = false;
      }
    });
  }
}
