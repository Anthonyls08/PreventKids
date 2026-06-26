export class VirtualConsultation {
  idVirtualConsultation: number = 0;
  fechacita: string = '';
  estado: string = '';
  urlsala: string = '';
  proveedor: string = '';
  // Llaves foráneas (FK): la consulta no puede existir sin ellas.
  idUser: number = 0;
  idProfessionalProfile: number = 0;
}
