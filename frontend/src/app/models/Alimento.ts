export interface Alimento {
  nombre: string;
  marca: string;
  calorias: number;   // kcal por 100 g
  azucar: number;     // g por 100 g
  grasa: number;      // g por 100 g
  proteina: number;   // g por 100 g
  imagen?: string;
  nutriscore: string; // a, b, c, d, e o '?'
}
