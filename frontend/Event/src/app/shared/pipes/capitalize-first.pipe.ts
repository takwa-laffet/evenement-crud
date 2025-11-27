import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Trim pour éviter les espaces au début
    value = value.trim();

    // Met la première lettre en majuscule et laisse le reste inchangé
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
