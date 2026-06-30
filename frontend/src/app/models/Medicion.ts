import { User } from "./User";

export class Medicion {

  idMedicion: number = 0;
  pesoKg: number = 0;
  tallaCm: number = 0;
  imc: number = 0;
  clasificacionimc: string = "";
  presion: number = 0;
  temperatura: number = 0;
  fechamedicion: Date = new Date();

  // FK enviada al backend al registrar/actualizar
  idUser: number = 0;

  // Objeto devuelto por el backend al listar (solo lectura)
  user: User = new User();
}
