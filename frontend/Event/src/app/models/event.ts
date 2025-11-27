// src/app/models/event.ts
export interface Event {
  id: number;
  titre: string;
  description: string;
  date: string | Date; 
  lieu: string;
  prix: number;
  nbPlaces: number;
  imageUrl: string;
  domaines?: string[];
  organisateurId: number;
  nbrLikes: number;
}