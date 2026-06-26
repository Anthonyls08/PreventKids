import { TipoAlerta } from "./TipoAlerta";
import { Medicion } from "./Medicion";

export class Alert {

  idAlert: number = 0;
  leida: boolean = false;
  generationdate: Date = new Date();

  tipoalert: TipoAlerta = new TipoAlerta();
  medicion: Medicion = new Medicion();

}