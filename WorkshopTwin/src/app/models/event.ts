export interface Event {
  id?: number;
  titre: string;
  description: string;
  date: string;   // LocalDateTime from Spring Boot → send as ISO string
  prix: number;
  nbPlaces: number;
  lieu: string;
  imageUrl: string;
  domaines: string[];
  organisateurId: number;
  nbrLikes: number;
}
