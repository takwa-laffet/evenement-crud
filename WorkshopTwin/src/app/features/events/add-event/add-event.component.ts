import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { futurDateValidator } from '../../../shared/validators/futur-date.validator';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {

  eventForm!: FormGroup;

  constructor(private eventService: DataService, private router: Router) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(30),
      ]),
      date: new FormControl('', [Validators.required, futurDateValidator(7)]),
      prix: new FormControl('', [Validators.required]),
      nbPlaces: new FormControl('', [Validators.required]),
      lieu: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(''),
      domaines: new FormArray([
        new FormControl('', [Validators.required, Validators.minLength(3)]),
      ]),
    });
  }

  get domaines() {
    return this.eventForm.get('domaines') as FormArray;
  }

  addDomain() {
    this.domaines.push(
      new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])
    );
  }

  onSubmit() {
    if (this.eventForm.invalid) return;

    const formValue = this.eventForm.value;

    const newEvent: Event = {
      titre: formValue.titre,
      description: formValue.description,
      date: formValue.date, // ISO string, backend accepts LocalDateTime
      prix: Number(formValue.prix),
      nbPlaces: Number(formValue.nbPlaces),
      lieu: formValue.lieu,
      imageUrl: formValue.imageUrl,
      domaines: formValue.domaines,
      organisateurId: 1,
      nbrLikes: 0,
    };

    this.eventService.addEvent(newEvent).subscribe({
      next: () => this.router.navigate(['/events']),
      error: (err) => console.error('Error saving event:', err)
    });
  }
}
