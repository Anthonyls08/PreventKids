export class EducationalContent {
  idEducationalContent: number = 0;
  tittleEducationalContent: string = '';
  descriptionEC: string = '';
  urlContent: string = '';
  typeEC: string = '';
  // Foreign keys (obligatorias)
  idProfessionalProfile: number = 0;
  idTipocontenido: number = 0;
}
