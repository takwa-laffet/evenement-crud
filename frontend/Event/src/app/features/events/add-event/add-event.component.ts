// src/app/components/events/add-event/add-event.component.ts
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
import { Event } from '../../../models/event';
import { futurDateValidator } from '../../../shared/validators/futur-date.validator';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventForm!: FormGroup;

  constructor(private eventService: DataService, private router: Router) {
    this.eventForm = new FormGroup({
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z\\s]*$'), // allow spaces
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(30),
      ]),
      date: new FormControl('', [Validators.required, futurDateValidator(7)]),
      prix: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+(\\.\\d{1,2})?$'),
      ]),
      nbPlaces: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]?$|^100$'),
      ]),
      lieu: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(''),
      domaines: new FormArray([this.createDomainControl()]),
      // These are static/default
      organisateurId: new FormControl(1),
      nbrLikes: new FormControl(0),
    });
  }

  createDomainControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  get titre() {
    return this.eventForm.get('titre');
  }
  get description() {
    return this.eventForm.get('description');
  }
  get date() {
    return this.eventForm.get('date');
  }
  get domaines() {
    return this.eventForm.get('domaines') as FormArray;
  }

  addDomain() {
    this.domaines.push(this.createDomainControl());
  }
private formatDateForBackend(dateString: string): string {
  // Input from datetime-local: "2025-12-10T18:00"
  const date = new Date(dateString);
  // Format as "yyyy-MM-dd'T'HH:mm:ss"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
onSubmit() {
  if (this.eventForm.invalid) return;

  const formValue = this.eventForm.value;

  const eventToSend: Event = {
    id: 0,
    titre: formValue.titre,
    description: formValue.description,
    date: this.formatDateForBackend(formValue.date),
    lieu: formValue.lieu,
    prix: +formValue.prix,
    nbPlaces: +formValue.nbPlaces,
    imageUrl: formValue.imageUrl || '',
    domaines: formValue.domaines.filter((d: string) => d.trim() !== ''),
    organisateurId: formValue.organisateurId,
    nbrLikes: formValue.nbrLikes,
  };

  this.eventService.addEvent(eventToSend).subscribe({
    next: () => {
      console.log('Event added successfully');
      this.router.navigate(['/events']);
    },
    error: (err: any) => {
      console.error('Error adding event:', err);
    },
  });
}
}