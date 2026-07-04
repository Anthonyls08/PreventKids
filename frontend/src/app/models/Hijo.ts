import { User } from './User';
import { PhysicalLimitation } from './physical-limitation';

export class Hijo {
  idHijo: number = 0;
  nombre: string = '';
  apellido: string = '';
  fechanacimiento: Date = new Date();
  genero: string = '';

  // FKs enviadas al backend al registrar/actualizar
  // (idUser solo lo usa el admin; el padre se asigna solo desde el token)
  idUser: number = 0;
  idPhysicalLimitation: number = 0;

  // Objetos devueltos por el backend al listar (solo lectura)
  user: User = new User();
  physicallimitation: PhysicalLimitation | null = null;
}
