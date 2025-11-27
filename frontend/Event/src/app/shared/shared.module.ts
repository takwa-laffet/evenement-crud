import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformDatePipe } from './pipes/transform-date.pipe';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';



@NgModule({
  declarations: [
    TransformDatePipe,
    CapitalizeFirstPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
