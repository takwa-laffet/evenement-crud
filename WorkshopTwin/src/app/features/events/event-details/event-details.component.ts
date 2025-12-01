import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']   // FIX: styleUrl → styleUrls
})
export class EventDetailsComponent {

  id!: number;
  eventDetails!: Event;

  constructor(
    private actRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    this.dataService.getEventById(this.id).subscribe({
      next: (data) => {
        this.eventDetails = data;
        console.log('Event details:', this.eventDetails);
      },
      error: () => {
        console.error('Failed to load event details.');
      }
    });
  }
}
