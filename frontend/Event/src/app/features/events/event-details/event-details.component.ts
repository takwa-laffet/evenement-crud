import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  id!: number;
  eventDetails!: Event;

  constructor(
    private actRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.id = +this.actRoute.snapshot.params['id']; // + converts string to number
    this.dataService.getEventById(this.id).subscribe({
      next: (event: Event) => {
        this.eventDetails = event;
      },
      error: (err: any) => {
        console.error('Error loading event:', err);
        // Optional: redirect to 404 or show error message
      }
    });
  }
}