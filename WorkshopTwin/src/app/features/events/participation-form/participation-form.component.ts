import { Component, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participation-form',
  templateUrl: './participation-form.component.html',
  styleUrl: './participation-form.component.css',
})
export class ParticipationFormComponent {
  id!: number;
  price!: number;
  totalPrice: number | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.activatedRoute);
    // this.id=this.activatedRoute.params.subscribe()
    this.id = this.activatedRoute.snapshot.params['id'];
    this.price = Number(this.activatedRoute.snapshot.params['prix']);
  }

  calculTotalPrice(nbplace: string) {
    const nbP = Number(nbplace);
    console.log(nbP);
    if (nbP > 0) {
      this.totalPrice = nbP * this.price;
      console.log(this.totalPrice);
    } 
  }
}
